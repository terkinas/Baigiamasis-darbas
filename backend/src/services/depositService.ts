// addToCheckListWallet

import { DepositRepository } from "../database/repository/depositRepository";
import { IClientDeposit } from "../types/client/deposit.interface";


class DepositService {

    private depositRepository: DepositRepository

    constructor() {
        this.depositRepository = new DepositRepository();
    }

    async addToCheckListWallet({ currency, userId }: { currency: string, userId: string }): Promise<IClientDeposit> {
        try {
            await this.depositRepository.validateCurrency(currency);

            const walletId = await this.depositRepository.findUserWalletByCurrency({ currency, userId });

            const clientDeposit = await this.depositRepository.createCheckListDeposit({ walletId, userId });

            if (!clientDeposit) {
                throw new Error('Error adding to check list wallet');
            }

            return clientDeposit;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to add to check list wallet');
            }
        }
    }

    async checkWalletDeposits({ userId, walletId, currency }: { userId: string, walletId: string, currency: string }) {
        try {
            await this.depositRepository.validateCurrency(currency);

            return await this.depositRepository.checkWalletBlockchain({ userId, walletId, currency }) as boolean | IClientDeposit
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to check wallet deposits');
            }
        }
    }

    async checkIfDepositIsBeingChecked({ userId, walletId, currency }: { userId: string, walletId: string, currency: string }): Promise<boolean> {
        try {
            await this.depositRepository.validateCurrency(currency);

            const isAlreadyInCheckList = await this.depositRepository.isDepositInCheckList({ userId, walletId, currency });

            return isAlreadyInCheckList
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to check if deposit is being checked');
            }
        }
    }
}

export const depositService = new DepositService();