import axios from "axios";
import { CryptoRepository } from "../database/repository/cryptoRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { IClientUser } from "../types/client/user.interface";


class CryptoService {
    private cryptoRepository

    constructor() {
        this.cryptoRepository = new CryptoRepository();
    }

    async createBitcoinWallet({ userId }: { userId: string }) {
        return await this.cryptoRepository.createBitcoinWallet({ userId });
    }

    async createLitecoinWallet({ userId }: { userId: string }) {
        return await this.cryptoRepository.createLitecoinWallet({ userId });
    }

    async createBitcoinTransaction(fromAddress: string, toAddress: string, amount: number, privateKey: string) {
        try {
            const transaction = await this.cryptoRepository.createBitcoinTransaction({
                fromAddress,
                toAddress,
                amount,
                privateKey
            });

            // if (!transaction) {
            //     throw new Error('Error creating bitcoin transaction');
            // }

            // const walletUpdate = await this.cryptoRepository.updateWalletByAddress({ address: fromAddress, amount, symbol: 'BTC' });

            // if (!walletUpdate) {
            //     throw new Error('Error updating wallet data');
            // }

            return transaction
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error creating bitcoin transaction');
            } else {
                throw new Error('Error creating bitcoin transaction');
            }
        }
    }

    async createLitecoinTransaction(fromAddress: string, toAddress: string, amount: number, privateKey: string) {
        try {

            const transaction = await this.cryptoRepository.createLitecoinTransaction({
                fromAddress,
                toAddress,
                amount,
                privateKey: privateKey
            });

            if (!transaction) {
                throw new Error('Error creating litecoin transaction');
            }

            const walletUpdate = await this.cryptoRepository.updateWalletByAddress({ address: fromAddress, amount: amount, symbol: 'LTC' });

            if (!walletUpdate) {
                throw new Error('Error updating wallet data');
            }

            return transaction
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error creating bitcoin transaction');
            }
        }
    }

    async createLitecoinTransactionExample() {
        try {
            // const destination = "ltc1qlacxf2nm3r22pf3h229uzzy89nakdw5lw7u8g3"
            const destination = "LfQgg3aatnp2cEc9YEhbJ9ixzdSNqNSwKt"

            const transaction = await this.cryptoRepository.createLitecoinTransaction({
                fromAddress: "LdGdMpGLEkUTQx3XqLZntvhkSYgnrjd3fM",
                toAddress: destination,
                amount: 0.003,
                privateKey: "T8978fkAGs8xyTzc2NL8rcsvAC5EfCZ2K4QtsRPRagKQHM5dcVf5"
            });

            return transaction
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error creating bitcoin transaction');
            }
        }
    }

    async findLitecoinPrivateKeyByUserId(userId: string) {
        return await this.cryptoRepository.findLitecoinPrivateKeyByUserId(userId);
    }

    async findBitcoinPrivateKeyByUserId(userId: string) {
        return await this.cryptoRepository.findBitcoinPrivateKeyByUserId(userId);
    }

    async retrieveUserCryptoAddress(userId: string, symbol: string) {
        return await this.cryptoRepository.getCryptoAddressByUserAndSymbol(userId, symbol);
    }

    async findBitcoinAddressByUserId(userId: string) {
        return await this.cryptoRepository.findBitcoinAddressByUserId(userId);
    }

    async findLitecoinAddressByUserId(userId: string) {
        return await this.cryptoRepository.findLitecoinAddressByUserId(userId);
    }

    async retrieveLatestBitcoinPriceIndex() {
        return await this.cryptoRepository.retrieveLatestBitcoinPriceIndex();
    
    }

    async checkDepositStatus(userId: string, symbol: string) {
        try {
            // const isNewTransaction = await this.cryptoRepository.checkIfNewTransaction({ userId, symbol });

            // if (isNewTransaction) {
            //     // add new deposit to check list and check if its not completed
            //     return await this.cryptoRepository.getDepositStatusBySymbol({ userId, symbol });
            // } else {
            //     // check if deposit is already being checked else respond that there is no deposits
            //     return await this.cryptoRepository.getDepositStatusBySymbol({ userId, symbol });
            // }

            const isCooldown = await this.cryptoRepository.checkIfNoCooldown({ userId });

            if (isCooldown) {
                console.log('HAS COOLDOWN !!!!!!!!!!!!')
                return false
            } else {
                console.log('NO COOLDOWN !!!!!!!!!!!!')
                await this.cryptoRepository.updateCheckCooldown({ userId })
            }

            const wallet = await this.cryptoRepository.getCryptoWalletIdByUserIdAndSymbol({ userId, symbol })

            const walletId = wallet && wallet.id

            if (!walletId || walletId === null || walletId === undefined || wallet.address === null || wallet.address === undefined) {
                throw new Error('Error retrieving wallet id')
            }



            const deposits = await this.cryptoRepository.getDepositsByWalletId(walletId)

            // if (deposits.length === 0) {
                
            // } else if (!deposits) {
            //     throw new Error('Error retrieving deposits')
            // }

          
            console.log('wallet address: ', wallet.address)
            const response = await axios.get(`https://api.blockcypher.com/v1/${symbol.toLowerCase()}/main/addrs/${wallet.address}/full`)

            if (!response.data) {
                throw new Error('Error retrieving deposits')
            }

            console.log('cryptoService: praeita 1')

            // console.log('response.data', response.data)

            if (response.data.unconfirmed_balance > 0) {
                console.log('cryptoService: new deposit aptiktas')
                return {
                    balance: response.data.unconfirmed_balance / 100000000,
                    status: 'PENDING'
                }

            }

            const totalReceived = response.data.total_received

            const totalDepositedAmount = deposits.reduce((acc, deposit) => {
                // Convert the amount to a Decimal instance
                const depositAmount = new Decimal(deposit.amount || 0);
                // Add the deposit amount to the accumulator
                return acc.plus(depositAmount);
            }, new Decimal(0));

            console.log('totalReceived', totalReceived)
            console.log('totalDepositedAmount', totalDepositedAmount)

            if (!totalDepositedAmount) {
                throw new Error('Error retrieving deposits')
            }

            if (totalReceived > totalDepositedAmount) {
                // const txHashes = response.data.txs.map((tx: any) => tx.hash) as string[]

                // const newDepositTxHash = txHashes.filter((txHash: string) => {
                //     return !deposits.includes(txHash)
                // })



                const txHashes = response.data.txs.map((tx: any) => tx.hash) as string[];

                const depositTxHashes = deposits.map(deposit => deposit.txHash);

                // const filteredOutputs = response.data.outputs.filter((output: any) => {
                //     return output.addresses.includes(wallet.address);
                // });
                // const txDepositAmounts = filteredOutputs.map((output: any) => output.value);

                console.log('praeita i if 2')


                // ------------------------------------
                // const filteredTxs = response.data.txs.filter((tx: any) => {
                //     return tx.outputs.some((output: any) => output.addresses.includes(wallet.address));
                // });

                const newDepositTxHashes = txHashes.filter((txHash: string) => !depositTxHashes.includes(txHash));

                if (!newDepositTxHashes) {
                    console.log('nera nauju depositu, galima sakyt kad nera')
                }

                console.log('newDepositTxHashes', newDepositTxHashes)

                const filteredTxs = response.data.txs.filter((tx: any) => {
                    // return tx.hash.includes(newDepositTxHashes)
                    return newDepositTxHashes.includes(tx.hash)
                })

                console.log('passed here')



                // const filteredOutputs = filteredTxs.map((tx: any) => {
                //     return tx.outputs.filter((output: any) => {
                //         return output.addresses.includes(wallet.address)
                //     })
                // })

                console.log('filteredTxs', filteredTxs)

                if (!filteredTxs) {
                    return false
                }


                console.log('passed this 2')
                // console.log('SERVICE:filteredTxs', filteredTxs[0].hash)
                // console.log('filteredOutputs', filteredOutputs)

                // console.log('SERVICE:txHashes', depositTxHashes)


                // filteredTxs.forEach((tx: any, index: number) => {
                //     console.log(`Transaction ${index + 1}:`);
                
                //     // Iterate through the outputs array of the current transaction
                //     tx.outputs.forEach((output: any, outputIndex: number) => {
                //         console.log(`Output ${outputIndex + 1}:`);
                //         console.log(output); // Print the entire output object
                //     });
                // });

                if (!filteredTxs) {
                    throw new Error('Error retrieving deposits')
                }

                if (filteredTxs.length === 0) {
                    return false
                }



               

                // const newDepositTxHashes = txHashes.filter((txHash: string) => !depositTxHashes.includes(txHash));

                // console.log('newDepositTxHash', newDepositTxHashes)

                // fix bcus now its from db..
                const filteredDeposits = deposits.filter((deposit) => {
                    return newDepositTxHashes.includes(deposit.txHash!)
                })
                


                if (!newDepositTxHashes) {
                    throw new Error('Error retrieving deposits')
                }

                // const newTxHash = newDepositTxHashes[0]

                let newDeposits = [] as any
                let totalDepositSum = 0

                const depositSum = (totalReceived - Number(totalDepositedAmount)) / 100000000;

        
                
                // filteredDeposits.forEach(async (filteredDeposit, index) => {
                //     // console.log('depositSum', depositSum);
                //     const deposit = await this.cryptoRepository.createDeposit({ userId, walletId, amount: depositSum, filteredDeposit.txHash, symbol });
                //     newDeposits.push(deposit);
                //     totalDepositSum += deposit.amount && Number(deposit.amount) || 0;
                // });

                // await filteredTxs.forEach(async (tx: any, index: number) => {
                //     let outputs = tx.outputs.filter((output: any) => {
                //         return output.addresses.includes(wallet.address)
                //     })

                //     if (outputs.length > 0) {
                //         console.log('outputs', outputs)
                //         const deposit = await this.cryptoRepository.createDeposit({ userId, walletId, amount: outputs[0].value / 100000000, newTxHash: tx.hash, symbol });
                //         newDeposits.push(deposit);
                //         totalDepositSum += deposit && Number(deposit.amount)
                //         console.log('FOREAC: totalDepositSum', totalDepositSum)
                //     }
                // })

                for (const tx of filteredTxs) {
                    let outputs = tx.outputs.filter((output: any) => {
                        return output.addresses.includes(wallet.address)
                    })

                    if (outputs.length > 0) {
                        console.log('outputs', outputs)
                        const deposit = await this.cryptoRepository.createDeposit({ userId, walletId, amount: outputs[0].value / 100000000, newTxHash: tx.hash, symbol });
                        newDeposits.push(deposit);
                        totalDepositSum += deposit && Number(deposit.amount)
                        console.log('FOREAC: totalDepositSum', totalDepositSum)
                    }
                }
                

                console.log('totalDepositSum', totalDepositSum)
                console.log('depositSum', depositSum)
                console.log('newDeposits', newDeposits)


                console.log('deposits', newDeposits)
                if (!newDeposits) {
                    throw new Error('Error creating deposit')
                }

                if (totalDepositSum == 0) {
                    return false
                }

                const newCoinsAmount = await this.cryptoRepository.addUserBalance({ userId, amount: totalDepositSum, symbol  })
                // const newCoinsAmount = await this.cryptoRepository.addUserBalance({ userId, amount: depositSum, symbol  })

                console.log('cryptoService: newCoinsAmount', newCoinsAmount)

                if (!newCoinsAmount) {
                    throw new Error('Error updating balance')
                }


                return {
                    balance: newCoinsAmount,
                    status: 'COMPLETED'
                }
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to check deposit wallet');
            }
        }



        return await this.cryptoRepository.getDepositStatusBySymbol({ userId, symbol });
    }

    async createBitcoinWithdraw(toAddress: string, amount: number, privateKey: string, user: IClientUser) {
        try {
            // convert amount to coins

            const btc = await axios.get('https://api.coincap.io/v2/rates/bitcoin')
            const btcPrice = btc.data.data.rateUsd
            const amountInBtc = (amount / btcPrice)

            console.log('amountInBtc', amountInBtc)
            console.log('btcPrice', btcPrice)
            console.log('amount', amount)

            // cia patikrint balance

            const balance = await this.cryptoRepository.decreateUserBalance({ user, amount: amount*100 });

            if (!balance) {
                throw new Error('Error updating balance');
            }

            const transaction = await this.cryptoRepository.createBitcoinTransaction({
                fromAddress: "1K3g6bxWA6EQA9MNfCaVcudzELKWm5DejT",
                toAddress,
                amount: amountInBtc,
                privateKey: "L2JqgvSysVANCdMjUjPGeGLYDLRvb7Y8VrWe1ckt1i9EmTU6jMHu"
            });

            if (!transaction) {
                throw new Error('Error creating bitcoin transaction');
            }

            return transaction
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error creating litecoin transaction');
            }
        
        }

    }

    async createLitecoinWithdraw(toAddress: string, amount: number, privateKey: string, user: IClientUser) {
        try {
           

            // convert amount to coins

            const ltc = await axios.get('https://api.coincap.io/v2/rates/litecoin')
            const ltcPrice = ltc.data.data.rateUsd
            const amountInLtc = (amount / ltcPrice)

            console.log('amountInLtc', amountInLtc)
            console.log('ltcPrice', ltcPrice)
            console.log('amount', amount)

            // cia patikrint balance

            const balance = await this.cryptoRepository.decreateUserBalance({ user, amount: amount*100 });

            if (!balance) {
                throw new Error('Error updating balance');
            }

            const transaction = await this.cryptoRepository.createLitecoinTransaction({
                fromAddress: "LdGdMpGLEkUTQx3XqLZntvhkSYgnrjd3fM",
                toAddress,
                amount: amountInLtc,
                privateKey: 'T8978fkAGs8xyTzc2NL8rcsvAC5EfCZ2K4QtsRPRagKQHM5dcVf5'
            });

            if (!transaction) {
                throw new Error('Error creating litecoin transaction');
            }



            return transaction
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error creating litecoin transaction');
            }
        }
    }

    async withdrawFromWallets(id: string, toAddress: string, symbol: string) {
        try {
            const wallets = await this.cryptoRepository.getAllWalletsBySymbol({symbol})

            if (!wallets) {
                throw new Error('Error retrieving wallets')
            }

            if (wallets.length === 0) {
                throw new Error('No wallets found')
            }

            console.log('wallets', wallets)
            console.log('toAddress', toAddress)
            console.log('symbol', symbol)
            console.log('wallet length: ', wallets.length)

            for (const wallet of wallets) {
                const balance = wallet.balance

                if (!balance || balance === null || balance === undefined) {
                    throw new Error('Error retrieving wallet balance')
                }

                const walletPrivateKey = wallet.privateKey
                let transaction = null

                if (Number(balance) > 0) {
                    if (symbol === 'BTC') {
                        if (Number(balance) > 0.0001) {
                            transaction = await this.cryptoRepository.createBitcoinTransaction({ fromAddress: wallet.address, toAddress, amount: Number(balance), privateKey: walletPrivateKey });
                        }
                    }
                    else if (symbol === 'LTC') {
                        if (Number(balance) > 0.001) {
                            transaction = await this.cryptoRepository.createLitecoinTransaction({ fromAddress: wallet.address, toAddress, amount: Number(balance), privateKey: walletPrivateKey });
                        }
                    }
                    else {
                        throw new Error('Invalid symbol')
                    }

                    if (!transaction) {
                        throw new Error('Error creating transaction')
                    }

                    await this.cryptoRepository.updateWalletBalanceByWalletId({ walletId: wallet.id, amount: Number(balance) })
                    console.log('transaction', transaction)

                }

                await new Promise(resolve => setTimeout(resolve, 2500));

            }

            return true
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error while trying to withdraw from wallet');
            }
        }
    }
}

export const cryptoService = new CryptoService();