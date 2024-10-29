import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { userRepository } from '../database/repository/userRepository';
import { IClientUser } from '../types/client/user.interface';
import { Application } from 'express';

const prisma = new PrismaClient();



// export default passport;


const passportConfig = (app: Application) => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
          const user = await userRepository.getUserWithPasswordByUsername(username);
    
          if (!user) {
            return done(null, false);
          }
  
          const passwordsMatch = await bcrypt.compare(password, user.password);
  
          if (passwordsMatch) {

            // if (!user.balance) {
            //   throw new Error('User balance not found');
            // }

            // console.log('BALANCE LAST CLAIMED: ', user.balance.lastClaimed)
  
            return done(null, {
              id: user.id,
              username: user.username,
              avatarId: user.avatarId,
              balances: user.balance
            } as IClientUser);
          } else {
            return done(null, false);
          }
        } catch (error) {
          // Handle potential errors (e.g., database connection issues)
          return done(error);
        }
    }
  ));
  
  
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: string, done) => {
      try {
        const user = await userRepository.getUserById(id);
    
        if (!user) {
          return done(null, false);
        }
  
        return done(null, user);
      } catch (error) {
        // Handle potential errors (e.g., database connection issues)
        return done(error);
      }
    });  
}

export default passportConfig;