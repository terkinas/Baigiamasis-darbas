
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IClientUser } from "../../types/client/user.interface"
import { IServerUser } from "../../types/server/user.interface"
import prisma from "../../utils/prisma";

export class UserRepository {
    async createUser({ username, password }: IServerUser) {
        try {
            return await prisma.user.create({ 
                data: {
                    username: username.toLowerCase(),
                    password,
                    balance: {
                        create: {
                            amount: 0
                        }
                    
                    }
                },
                select: {
                    id: true,
                    username: true,
                    balance: {
                        select: {
                            amount: true
                        }
                    }
                }
             }) as IClientUser;
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
            const user = await prisma.user.findUnique({ 
                where: { id }, 
                select: {
                    id: true,
                    username: true,
                    balance: {
                        select: {
                            amount: true
                        }
                    }
                }
            }) as IClientUser;

            if (user === null) {
                throw new Error('User not found');
              }
          
              return {
                id: user.id,
                username: user.username,
                balance: user.balance
              };
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
                password: true,
                balance: {
                    select: {
                        amount: true
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
}

export const userRepository = new UserRepository();