import { Prisma } from "@prisma/client";
import { IClientDeposit } from "../../types/client/deposit.interface";
import prisma from "../../utils/prisma";
import axios from "axios";
import { calculateCryptoCurrencyPrice } from "../../utils/currenciesHelper";

export class DepositRepository {
    async validateCurrency(currency: string): Promise<boolean> {

        const validCurrencies = ['LTC', 'BTC'];

        if (!validCurrencies.includes(currency)) {
            throw new Error('Invalid currency.');
        }

        return true
    }

    async findUserWalletByCurrency({ currency, userId }: { currency: string, userId: string }): Promise<string> {
        try {
            const walletId = (await prisma.wallet.findFirst({
                where: {
                    currency,
                    userId
                },
                select: {
                    id: true
                }
            }))?.id;

            if (!walletId) {
                throw new Error('Wallet not found.');
            }

            return walletId;
        } catch (error) {
            console.error('Error finding user wallet by currency:', error);
            throw error;
        }
    }

    async createCheckListDeposit({ walletId, userId }: { walletId: string, userId: string }): Promise<IClientDeposit> {
        try {
            const deposit = await prisma.deposit.create({
                data: {
                    walletId,
                    userId,
                    status: 'PENDING'
                },
                select: {
                    amount: true,
                    walletId: true,
                    status: true
                }
            });

            if (!deposit) {
                throw new Error('Error creating check list deposit');
            }

            const clientDeposit: IClientDeposit = {
                amount: deposit.amount?.toNumber(), // Assuming a default value if amount is null
                walletId: deposit.walletId,
                status: deposit.status
            };

            return clientDeposit as IClientDeposit;
        } catch (error) {
            console.error('Error creating check list deposit:', error);
            throw error;
        }
    }

    async checkWalletBlockchain({ userId, walletId, currency }: { userId: string, walletId: string, currency: string }): Promise<boolean | IClientDeposit> {
        try {
            const wallet = (await prisma.wallet.findUnique({
                where: { id: walletId },
                select: { 
                    address: true,
                    totalReceived: true
                 }
            }))

            if (!wallet) {
                throw new Error('Wallet address not found.');
            }

            const apiResponse = await this.callBlockchainAPI(wallet.address, currency);

            if (!apiResponse) {
                throw new Error('Internal server error.');
            }

            if (apiResponse.total_received <= wallet.totalReceived) {
                return false;
            }

            const deposit = await prisma.deposit.create({
                data: {
                    walletId,
                    userId,
                    amount: new Prisma.Decimal(apiResponse.total_received - Number(wallet.totalReceived)),
                    status: 'COMPLETED'
                }, select: { 
                    amount: true,
                    walletId: true,
                    status: true
                }
            })

            await prisma.wallet.update({
                where: { id: walletId },
                data: {
                    totalReceived: apiResponse.total_received
                }
            });

            const balanceId = (await prisma.balance.findFirst({
                where: { userId },
                select: { id: true }
            }))?.id;

            if (!balanceId) {
                throw new Error('Balance not found.');
            }

            // calculate coins to add to balance

            const addToBalance = await calculateCryptoCurrencyPrice(deposit.amount?.toNumber() as number, currency);

            const balance = await prisma.balance.update({
                where: { id: balanceId },
                data: {
                    amount: {
                        increment: addToBalance
                    }
                }
            })

            if (!balance) {
                throw new Error('Error updating balance.');
            }

            const clientDeposit: IClientDeposit = {
                amount: deposit.amount?.toNumber(), // Assuming a default value if amount is null
                walletId: deposit.walletId,
                status: deposit.status
            };

            return clientDeposit;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to check wallet blockchain');
            
            }
        }
    }

    async isDepositInCheckList({ userId, walletId, currency }: { userId: string, walletId: string, currency: string }): Promise<boolean>{
        try {
            const deposit = await prisma.deposit.findFirst({
                where: {
                    walletId,
                    userId,
                    status: 'PENDING'
                }
            });

            if (!deposit || deposit == null) {
                return false
            }

            return true;
        } catch (error) {
            console.error('Error finding deposit in check list:', error);
            throw error;
        }
    }

    private async callBlockchainAPI(walletAddress: string, currency: string) {
        // Call external API to check wallet blockchain
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/full`);

        return response.data;
    }
}
