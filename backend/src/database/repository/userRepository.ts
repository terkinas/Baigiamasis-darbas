
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IClientUser } from "../../types/client/user.interface"
import { IServerUser } from "../../types/server/user.interface"
import prisma from "../../utils/prisma";
import bcrypt from 'bcrypt';

export class UserRepository {
    async createUser({ username, password }: IServerUser) {
        try {

            console.log('username', username)

            const user = await prisma.user.create({
                data: {
                    username: username.toLowerCase(),
                    password,
                    balance: {
                        create: {
                            amount: 0,
                        }
                    }
                },
                select: {
                    id: true,
                    username: true,
                    avatarId: true,
                    balance: {
                        select: {
                            amount: true,
                            lastClaimed: true
                        }
                    }
                }
            });

            const clientUser: IClientUser = {
                id: user.id,
                username: user.username,
                avatarId: user.avatarId,
                balance: user.balance
                    ? {
                        amount: user.balance.amount,
                        lastClaimed: user.balance.lastClaimed ? Number(user.balance.lastClaimed) : 0
                      }
                    : undefined
            };


            return clientUser;



            // return await prisma.user.create({ 
            //     data: {
            //         username: username.toLowerCase(),
            //         password,
            //         balance: {
            //             create: {
            //                 amount: 0,
            //             }
                    
            //         }
            //     },
            //     select: {
            //         id: true,
            //         username: true,
            //         balance: {
            //             select: {
            //                 amount: true,
            //                 lastClaimed: true
            //             }
            //         }
            //     }
            //  }) as IClientUser;


        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                // throw new Error('Username is already taken.');
                console.error('Username is already taken.');
            } else {
                // throw new Error('Error while trying to create user');
            }
        }
    }

    async createCryptoWalletsForUser(userId: string) {
        // later
        return
    }

    async getUserById(id: string): Promise<IClientUser>{
        try {
            // const user = await prisma.user.findUnique({ 
            //     where: { id }, 
            //     select: {
            //         id: true,
            //         username: true,
            //         avatarId: true,
            //         balance: {
            //             select: {
            //                 amount: true,
            //                 lastClaimed: true
            //             }
            //         }
            //     }
            // }) as IClientUser;

            const user = await prisma.user.findUnique({ 
                where: { id }, 
                select: {
                    id: true,
                    username: true,
                    avatarId: true,
                    balance: {
                        select: {
                            amount: true,
                            lastClaimed: true
                        }
                    }
                }
            });
            
            if (!user) {
                throw new Error("User not found");
            }
            
            // Convert `bigint` to `number`
            const clientUser: IClientUser = {
                id: user.id,
                username: user.username,
                avatarId: user.avatarId,
                balance: user.balance
                    ? {
                        amount: user.balance.amount,
                        lastClaimed: user.balance.lastClaimed ? Number(user.balance.lastClaimed) : 0
                      }
                    : undefined
            };
            
            return clientUser;

            // if (user === null) {
            //     throw new Error('User not found');
            //   }
          
            //   return {
            //     id: user.id,
            //     username: user.username,
            //     avatarId: user.avatarId,
            //     balance: user.balance
            //   };
        } catch (error) {
            throw new Error('Error while trying to find user');
        }
    }

    async getUserByUsername(username: string) {
        return await prisma.user.findUnique({ 
            where: { username: username.toLowerCase() },
            select: {
                id: true,
                balance: {
                    select: {
                        amount: true
                    }
                }
            }
         });
    }

    async getUserWithPasswordByUsername(username: string) {
        return await prisma.user.findUnique({ 
            where: { username: username.toLowerCase() },
            select: {
                id: true,
                username: true,
                avatarId: true,
                password: true,
                balance: {
                    select: {
                        amount: true,
                        lastClaimed: true
                    }
                }
            }
         });
    }

    async getUserTransactions(userId: string, page: string) {
        try {
            const transactions = await prisma.bet.findMany({
                where: {
                    userId: userId,
                    isSettled: true
                },
                orderBy: {
                    createdAt: 'desc'
                   
                },
                skip: (parseInt(page) - 1) * 15,
                take: 15,
                select: {
                    roundId: true,
                    amount: true,
                    betType: true,
                    outcome: true,
                    gameId: true,
                    createdAt: true
                }
            });
    
            console.log('transactions', transactions)
    
            if (transactions === null || transactions.length === 0) {
                throw new Error('Transactions not found');
            }
    
            return transactions;
        } catch (error) {
            throw new Error('Error while trying to get user transactions');
        }
    }

    async getUserRole(userId: string) {
        try {
            const user = await prisma.user.findUnique({ 
                where: { id: userId },
                select: {
                    role: true
                }
             });
    
            if (user === null) {
                throw new Error('User not found');
            }
    
            return user.role;
        } catch (error) {
            throw new Error('Error while trying to get user role');
        }
    }

    async getWalletsForAdmin(page: string) {
        try {
            const usersWithWallets = await prisma.user.findMany({
                skip: (parseInt(page) - 1) * 50,
                take: 50,
                where: {
                    role: 'USER',
                    wallets: {
                        some: {}
                    }
                },
                select: {
                    id: true,
                    username: true,
                    balance: {
                        select: {
                            amount: true
                        }
                    },
                    wallets: {
                        select: {
                            id: true,
                            currency: true,
                            balance: true,
                            totalReceived: true,
                            createdAt: true,

                    }
                },
                }
            });
    
            if (usersWithWallets === null || usersWithWallets.length === 0) {
                throw new Error('Wallets not found');
            }

            const wallets = usersWithWallets.map(user => {
                const totalBalance = user.wallets.reduce((acc, wallet) => acc + Number(wallet.balance), 0);

                console.log('totalBalance', totalBalance)
                return { ...user, totalBalance };
            });

            wallets.sort((a, b) => b.totalBalance - a.totalBalance);
    
            return wallets;
        } catch (error) {
            throw new Error('Error while trying to get wallets for admin');
        }
    }

    async getUserProfileStats(userId: string) {
        try {
            const user = await prisma.user.findUnique({ 
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    balance: {
                        select: {
                            amount: true
                        }
                    },
                    wallets: {
                        select: {
                            id: true,
                            currency: true,
                            balance: true,
                            totalReceived: true,
                            createdAt: true,
                        }
                    },
                    bets: {
                        select: {
                            id: true,
                            amount: true,
                            betType: true,
                            outcome: true,
                            createdAt: true
                        }
                    }
                }
             });
    
            if (user === null) {
                throw new Error('User not found');
            }
    
            const totalBalance = user.wallets.reduce((acc, wallet) => acc + Number(wallet.balance), 0);
    
            const totalWagered = user.bets.reduce((acc, bet) => acc + bet.amount, 0);
    
            // const totalWon = user.bets.filter(bet => bet.outcome === 'win').reduce((acc, bet) => acc + bet.amount, 0);

            const totalWon = user.bets.filter(bet => bet.outcome === bet.betType).reduce((acc, bet) => acc + bet.amount, 0);
    
            const totalLost = user.bets.filter(bet => bet.outcome !== bet.betType).reduce((acc, bet) => acc + bet.amount, 0);
    
            return { totalBalance, totalWagered, totalWon, totalLost };
        } catch (error) {
            throw new Error('Error while trying to get user profile stats');
        }
    }

    async changeUserPassword(userId: string, oldPassword: string, newPassword: string) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });
    
            if (user === null) {
                console.log('User not found while password change')
                throw new Error('User not found');
            }

            const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    
            if (!isOldPasswordCorrect) {
                console.log('Old password is incorrect while changing password')
                throw new Error('Old password is incorrect');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            await prisma.user.update({
                where: { id: userId },
                data: {
                    password: hashedPassword
                }
            });
        } catch (error) {
            throw new Error('Error while trying to change user password');
        }
    }

    async createAvatar(url: string) {
        try {
            return await prisma.avatar.create({
                data: {
                    url
                }
            });
        } catch (error) {
            throw new Error('Error while trying to create avatar');
        }
    }

    async changeAvatar(userId: string, avatarId: number) {
        try {
            const avatars = await prisma.avatar.count();

            if (avatarId > avatars && avatarId < 1) {
                throw new Error('Avatar not found');
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    avatarId
                }
            });
        } catch (error) {
            throw new Error('Error while trying to change avatar');
        }
    }

    async claimCoinsReward(userId: string) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });

            if (user === null) {
                throw new Error('User not found');
            }

            const currentBalance = await prisma.balance.findUnique({ where: { userId } });

            if (currentBalance === null || currentBalance.amount === null || currentBalance.lastClaimed === null) {
                throw new Error('Balance not found');
            }

            if (new Date().getTime() - Number(currentBalance.lastClaimed) < 86400000) {
                throw new Error('Coins reward already claimed');
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    balance: {
                        update: {
                            amount: currentBalance.amount + 10000,
                            lastClaimed: new Date().getTime()
                        }
                    }
                }
            });
        } catch (error) {
            console.log('error', error)
            throw new Error('Error while trying to claim coins reward');
        }
    }

    async disableUserMessages(userId: string) {
        try {
            // First, fetch the current isChatBanned status
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { isChatBanned: true } // Only retrieve the isChatBanned field
            });
    
            if (!user) {
                throw new Error('User not found');
            }
    
            // Update the isChatBanned field by inverting its current value
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    isChatBanned: !user.isChatBanned // Invert the value
                }
            });
    
            return updatedUser;
        } catch (error) {
            throw new Error('Error while trying to toggle user chat status');
        }
    }

    async getUserList(page: string) {
        try {
            const users = await prisma.user.findMany({
                skip: (parseInt(page) - 1) * 50,
                take: 50,
                select: {
                    id: true,
                    username: true,
                    role: true,
                    isChatBanned: true
                }
            });

            if (!users || users.length === 0) {
                throw new Error('Users not found');
            }

            return users;
        } catch (error) {
            throw new Error('Error while trying to get user list');
        }
    }

    async getAllTransactions(page: string) {
        try {
            const transactions = await prisma.bet.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                skip: (parseInt(page) - 1) * 15,
                take: 150,
                select: {
                    id: true,
                    user: {
                        select: {
                            username: true
                        }
                    },
                    amount: true,
                    betType: true,
                    outcome: true,
                    createdAt: true,
                    game: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            if (!transactions || transactions.length === 0) {
                throw new Error('Transactions not found');
            }

            return transactions;
        } catch (error) {
            throw new Error('Error while trying to get all transactions');
    }
    }
}

export const userRepository = new UserRepository();