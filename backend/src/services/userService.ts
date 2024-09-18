import { UserRepository } from "../database/repository/userRepository";
import bcrypt from 'bcrypt';
import { IServerUser } from "../types/server/user.interface";
import { IClientUser } from "../types/client/user.interface";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp({ username, password }: IServerUser) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            return await this.userRepository.createUser({ username, password: hashedPassword }) as IClientUser
        }

        catch (error) {
            if (error instanceof Error) {
                console.log('error', error)
                throw new Error(error.message || 'Error while trying to create user');
            }
        }
    }

    async signIn({ username, password }: IServerUser) {
        try {
            const user = await this.userRepository.getUserWithPasswordByUsername(username);

            if (!user) {
                throw new Error('User not found');
            }

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (!passwordsMatch) {
                throw new Error('Password incorrect');
            }

            return {
                id: user.id,
                username: user.username,
                balance: user.balance
            } as IClientUser;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message || 'Error while trying to sign in user');
            } else {
                throw new Error('Unknown error occurred');
            }
        }
    }

    async createCryptoWalletsForUser(userId: string) {
        return await this.userRepository.createCryptoWalletsForUser(userId);
    }

    async findUserById(id: string): Promise<IClientUser> {
        try {
            return await this.userRepository.getUserById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to find user');
            }
        }
    }

    async getUserTransactions(userId: string, page: string) {
        try {
            return await this.userRepository.getUserTransactions(userId, page);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to find user transactions');
            }
        }
    }

    async getUserRole(userId: string): Promise<string> {
        try {
            return await this.userRepository.getUserRole(userId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to find user role');
            }
        }
    }

    async getWalletsForAdmin(page: string) {
        try {
            return await this.userRepository.getWalletsForAdmin(page);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to find wallets for admin');
            }
        }
    }

    async getUserProfileStats(userId: string) {
        try {
            return await this.userRepository.getUserProfileStats(userId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to find user profile stats');
            }
        }
    }

}

export const userService = new UserService();