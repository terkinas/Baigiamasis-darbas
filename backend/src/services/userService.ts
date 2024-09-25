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

            console.log('hashedPassword', hashedPassword)

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

            if (!user.balance) {
                throw new Error('User balance not found');
            }

            return {
                id: user.id,
                username: user.username,
                balance: {
                    amount: user.balance.amount,
                    lastClaimed: Number(user.balance.lastClaimed)
                }
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

    async changeUserPassword(userId: string, oldPassword: string, newPassword: string) {
        try {
            return await this.userRepository.changeUserPassword(userId, oldPassword, newPassword);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to change user password');
            }
        }
    }

    async changeAvatar(userId: string, avatarId: string) {
        try {
            if (!avatarId) {
                throw new Error('Invalid avatar id');
            }

            const numericAvatarId = Number(avatarId);

            // Check if the conversion was successful
            if (isNaN(numericAvatarId) || !Number.isFinite(numericAvatarId)) {
                throw new Error('Avatar ID must be a valid number');
            }




            return await this.userRepository.changeAvatar(userId, numericAvatarId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to change user avatar');
            }
        }
    }

    async claimCoinsReward(userId: string) {
        try {
            return await this.userRepository.claimCoinsReward(userId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to claim coins reward');
            }
        }
    }

}

export const userService = new UserService();