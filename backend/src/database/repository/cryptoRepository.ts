import { mnemonicToSeed } from "bip39";
import prisma from "../../utils/prisma";
import { bitcoinConfig, litecoinConfig } from "../../config/blockchainsConfig";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from 'bitcoinjs-lib';
import axios from "axios";
import { UTXO } from "../../types/server/utxo.interface";
import bitcore from "bitcore-lib";

// @ts-ignore: Ignore the missing type declaration for litecore-lib
import litecore, { Address } from "litecore-lib";
import { Decimal } from "@prisma/client/runtime/library";
import { IClientUser } from "../../types/client/user.interface";

// import { PrivateKey, Networks, Address } from "bitcore-lib"

const bip32 = BIP32Factory(ecc)

export class CryptoRepository {

    // async createBitcoinWallet({ userId }: { userId: string }) {
    //     try {
    //         const keyPair = new PrivateKey();

    //         const publicKey = keyPair.toPublicKey()

    //         const address = new Address(publicKey, Networks.mainnet).toString()

    //         const publicKeyHex = publicKey.toString()

    //         // const publicKeyBuffer = Buffer.from(publicKeyHex, 'hex')

    //         const privateKey = keyPair.toString()


    //         const wallet = await prisma.wallet.create({
    //             data: {
    //                 currency: 'BTC',
    //                 userId: userId,
    //                 address: address,
    //                 publicKey: publicKeyHex,
    //                 privateKey: privateKey,

    //             }
    //         })

    //         return wallet
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             throw new Error(error.message);
    //         }
    //     }
    // }

    async createBitcoinWallet({ userId }: { userId: string }) {
        try {

            const mnemonic = "limb glue blouse poverty spread base useless bridge salad fiscal country jeans"
            // const mnemonic = `limb glue blouse poverty spread base useless bridge salad fiscal country jeans ${userId}`

            const seed = await mnemonicToSeed(mnemonic)

            const rootNode = bip32.fromSeed(seed, bitcoinConfig.networks.mainnet)

            // const masterKeyPair = await this.extractMasterKeys(rootNode)

            // if (!masterKeyPair) {
            //     throw new Error('Error generating master keys')
            // }

            // const { MasterPrivateKey, MasterPublicKey } = masterKeyPair

            const childNode = rootNode.derivePath(`m/44'/0'/0'/0/0`)

            const { address } = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network: bitcoinConfig.networks.mainnet })

            const privateKey = childNode.toWIF()

            if (!privateKey) {
                throw new Error('Error generating private key')
            }

            if (!address) {
                throw new Error('Error generating address')
            }

            // console.log('private key: ', privateKey)
            // console.log('address: ', address)

            const publicKeyHex = childNode.publicKey.toString('hex')

            // console.log('public key: ', publicKeyHex)

            if (!publicKeyHex) {
                throw new Error('Error generating public key')
            }

            const wallet = await prisma.wallet.create({
                data: {
                    currency: 'BTC',
                    userId: userId,
                    address: address,
                    publicKey: publicKeyHex,
                    privateKey: privateKey,

                }
            })

            return wallet
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async createLitecoinWallet({ userId }: { userId: string }) {
        try {

            const mnemonic = `limb glue blouse poverty spread base useless bridge salad fiscal country jeans ${userId}` 

            const seed = await mnemonicToSeed(mnemonic)

            const rootNode = bip32.fromSeed(seed, litecoinConfig.networks.mainnet)

            // const masterKeyPair = await this.extractMasterKeys(rootNode)

            // if (!masterKeyPair) {
            //     throw new Error('Error generating master keys')
            // }

            // const { MasterPrivateKey, MasterPublicKey } = masterKeyPair

            const childNode = rootNode.derivePath(`m/44'/0'/0'/0/0`)

            // const { address } = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network: litecoinConfig.networks.mainnet })

            // const publicKeyHash = litecore.crypto.Hash.sha256ripemd160(publicKey.toBuffer());
            // const { address } = new Address(childNode.publicKey, 'livenet').toString()

            const privateKey = childNode.toWIF()

            if (!privateKey) {
                throw new Error('Error generating private key')
            }

            // if (!address) {
            //     throw new Error('Error generating address')
            // }

            console.log('private key: ', privateKey)
            // console.log('ltc address: ', address)

            const publicKeyHex = childNode.publicKey.toString('hex')

            console.log('public key: ', publicKeyHex)

            if (!publicKeyHex) {
                throw new Error('Error generating public key')
            }

            const publicKeyBuffer = Buffer.from(publicKeyHex, 'hex');

            const publicKeyHash = litecore.crypto.Hash.sha256ripemd160(publicKeyBuffer);

            const address = new litecore.Address(publicKeyHash, 'livenet');

            console.log('ltc address: ', address.toString())
            
            const wallet = await prisma.wallet.create({
                data: {
                    currency: 'LTC',
                    userId: userId,
                    address: address.toString(),
                    publicKey: publicKeyHex,
                    privateKey: privateKey,

                }
            })

            return wallet
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }



        

    async createBitcoinTransaction({ fromAddress, toAddress, amount, privateKey }: { fromAddress: string, toAddress: string, amount: number, privateKey: string }) {
        try {
            console.log('trying to fetch')
            // const fromAddress = "1K3g6bxWA6EQA9MNfCaVcudzELKWm5DejT"
            // bitcoin for testnet:
            // const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${fromAddress}/full`)

            const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${fromAddress}/full`)

            console.log('response: ', response.data)

            const utxos = (response.data.txs || []) as any[]

            const inputs: UTXO[] = []

            let totalAmountAvailable = 0;
            let inputCount = 0;

            utxos.forEach((tx: any) => {
                tx.outputs.forEach((output: any, index: number) => {  // Change 'vout' to 'outputs'
                    if (!output.spent_by) {
                        const utxo: UTXO = {
                            satoshis: Math.floor(Number(output.value)),
                            script: output.script,  // Update to the correct property
                            address: fromAddress,
                            txid: tx.hash,  // Update to the correct property
                            outputIndex: index,
                        };

                        console.log('passes 2: ', utxo)
            
                        const isNotChangeOutput = output.addresses && output.addresses.includes(fromAddress);
                        console.log('isChangeOutput: ', isNotChangeOutput)

                        if (isNotChangeOutput) {
                            console.log('hope this ran once')
                            // Update total amount and input count
                            totalAmountAvailable += utxo.satoshis!;
                            inputCount += 1;

                            inputs.push(utxo);
                        }
                    }
                });
            });

            console.log('EXTRA: totalAmountAvailable: ', totalAmountAvailable)


            // 3. Generate transaction
            const transaction = new bitcore.Transaction();

            console.log('transactionBITCORE')
            // const satoshiToSend = amount * 100000000; // Convert BTC to satoshis
            const outputCount = 2; // One for recipient, one for change
    
            console.log('calculating fees')
            // Calculate fee
            const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
            const fee = transactionSize * 15; // 15 satoshi per byte

            console.log('fee size:', fee)

            const satoshiToSend = Math.floor((amount * 100000000) - fee);



            // Check if funds are sufficient to send the transaction
            if (totalAmountAvailable - satoshiToSend - fee < 0) {
                throw new Error("Insufficient funds");
            }

            console.log('checks if has enough funds')

            // Specify transaction details
            transaction.from(inputs as any);
            transaction.to(toAddress, satoshiToSend);
            transaction.change(fromAddress);
            transaction.fee(Math.round(fee));
            transaction.sign(privateKey);

            console.log('passes 3: ', transaction.serialize())

            const rawTx = transaction.serialize();

            console.log('done')
            console.log('rawTx: ', rawTx)
            // console.log('transaction before: ', transaction.toString())

            const broadcastResponse = await axios.post(`https://api.blockcypher.com/v1/btc/main/txs/push`, { "tx": rawTx} );

            console.log('broadcastResponse: ', broadcastResponse.data)

            return broadcastResponse.data

        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error creating bitcoin transaction');

            } else {
                throw new Error('Error creating bitcoin transaction');
            }
        }
    }

    async createLitecoinTransaction({ fromAddress, toAddress, amount, privateKey }: { fromAddress: string, toAddress: string, amount: number, privateKey: string }) {
        try {

            // console.log('tring to fetch')
            // console.log('fromAddress: ', fromAddress)
            // console.log('toAddress: ', toAddress)
            const response = await axios.get(`https://api.blockcypher.com/v1/ltc/main/addrs/${fromAddress}/full`)

            // console.log('response: ', response.data)

            const utxos = (response.data.txs || []) as any[]

            const inputs: UTXO[] = []

            let totalAmountAvailable = 0;
            let inputCount = 0;

            utxos.forEach((tx: any) => {
                tx.outputs.forEach((output: any, index: number) => {  // Change 'vout' to 'outputs'
                    if (!output.spent_by) {
                        // const utxo: UTXO = {
                        //     satoshis: Math.floor(Number(output.value)),
                        //     script: output.script,  // Update to the correct property
                        //     address: fromAddress,
                        //     txid: tx.hash,  // Update to the correct property
                        //     outputIndex: index,
                        // };

                        const utxo = {
                            txid: tx.hash,
                            outputIndex: index,
                            script: output.script,
                            satoshis: Math.floor(Number(output.value))
                        }
            
                        const isNotChangeOutput = output.addresses && output.addresses.includes(fromAddress);
                        // console.log('isChangeOutput: ', isNotChangeOutput)

                        if (isNotChangeOutput) {
                            // Update total amount and input count
                            totalAmountAvailable += utxo.satoshis!;
                            inputCount += 1;

                            inputs.push(utxo);
                        }
                    }
                });
            });

            const outputCount = 2; // One for recipient, one for change
            
            // Calculate fee
            const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
            const fee = transactionSize * 28; // 28 ltc per byte
            
            console.log('total fee in ltc: ', fee)
            
            const satoshiToSend = Math.floor((amount * 100000000) - fee); // Convert BTC to satoshis

            // Check if funds are sufficient to send the transaction
            if (totalAmountAvailable - satoshiToSend - fee < 0) {
                throw new Error("Insufficient funds");
            }

            const transaction = new litecore.Transaction();

            transaction.from(inputs as any);

            console.log('toAddress: ', toAddress)
            console.log('satoshiToSend: ', satoshiToSend)
            transaction.to(toAddress, satoshiToSend); // Convert LTC amount to satoshis
            transaction.change(fromAddress); // Send remaining funds back to sender
            transaction.sign(privateKey);

            // 8. Serialize transaction (optional for broadcasting)
            const rawTx = transaction.serialize();

            console.log('done')
            console.log('rawTx: ', rawTx)
            // console.log('transaction before: ', transaction.toString())

            const broadcastResponse = await axios.post(`https://api.blockcypher.com/v1/ltc/main/txs/push`, { "tx": rawTx} );

            console.log('broadcastResponse: ', broadcastResponse.data)

            return broadcastResponse.data
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);

            } else {
                throw new Error('Error creating bitcoin transaction');
            }
        }
    }

    async decreateUserBalance({ user, amount }: { user: IClientUser, amount: number }) {
        try {
            const balance = await prisma.balance.update({
                where: {
                    userId: user.id
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                },
                select: {
                    amount: true
                }
            })

            return balance.amount
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error decreasing user balance');
            }
    }

    
       
    }

    async findLitecoinPrivateKeyByUserId(userId: string) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: 'LTC'
                }
            })

            if (!wallet) {
                throw new Error('Wallet not found')
            }

            return wallet.privateKey
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async findBitcoinPrivateKeyByUserId(userId: string) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: 'BTC'
                }
            })

            if (!wallet) {
                throw new Error('Wallet not found')
            }

            return wallet.privateKey
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async findBitcoinAddressByUserId(userId: string) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: 'BTC'
                },
                select: {
                    address: true
                }
            })

            if (!wallet) {
                throw new Error('Wallet not found')
            }

            return wallet.address as string
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async findLitecoinAddressByUserId(userId: string) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: 'LTC'
                },
                select: {
                    address: true
                }
            })

            if (!wallet) {
                throw new Error('Wallet not found')
            }

            return wallet.address as string
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async retrieveLatestBitcoinPriceIndex() {
        try {
            const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')

            if (!response.data) {
                throw new Error('Error retrieving bitcoin price index')
            }

            return response.data
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async getCryptoAddressByUserAndSymbol(userId: string, symbol: string) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: symbol
                }
            })

            if (!wallet) {
                throw new Error('Wallet not found')
            }

            console.log('wallet: ', wallet)

            return wallet.address
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async getDepositStatusBySymbol({ userId, symbol }: { userId: string, symbol: string }) {
        try {
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error retrieving deposit status');
            }
        }
    }

    async getDepositStatusOfLatestTransaction({ userId, symbol }: { userId: string, symbol: string }): Promise<any | null>{
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: symbol
                },
                select: {
                    id: true
                }
            })

            if (!wallet || !wallet.id) {
                throw new Error('Wallet not found')
            }

            const deposit = await prisma.deposit.findFirst({
                where: {
                    userId: userId,
                    walletId: wallet.id
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            if (!deposit || deposit == null) {
                return null
            }

            return deposit
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error retrieving deposit status');
            }
        }
    }

    async getDepositsByWalletId(walletId: string) {
        try {
            const deposits = await prisma.deposit.findMany({
                where: {
                    walletId: walletId
                }
            })

            return deposits
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error checking deposit status');
            }
        }
    }

    async getDepositsByUserIdAndSymbol({ userId, symbol }: { userId: string, symbol: string }) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: symbol
                },
                select: {
                    id: true,
                    address: true
                }
            })

            if (!wallet || !wallet.id || !wallet.address) {
                throw new Error('Wallet not found')
            }

            const deposits = await prisma.deposit.findMany({
                where: {
                    userId: userId,
                    walletId: wallet.id
                }
            })

            return deposits

            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error checking deposit status');
            }
        }
    }
    
    async createDeposit({ userId, walletId, amount, newTxHash, symbol }: { userId: string, walletId: string, amount: number, newTxHash: string, symbol: string }) {
        try {
            const deposit = await prisma.deposit.create({
                data: {
                    userId: userId,
                    walletId: walletId,
                    amount: amount,
                    txHash: newTxHash,
                    status: 'COMPLETED',
                    currency: symbol
                }
            })


            const wallet = await prisma.wallet.update({
                where: {
                    id: walletId
                },
                data: {
                    balance: {
                        increment: amount
                    },
                    totalReceived: {
                        increment: amount
                    }
                }
            })

            if (!deposit) {
                throw new Error('Error creating deposit')
            }

            if (!wallet) {
                throw new Error('Error updating wallet')
            }


            return deposit
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error creating deposit');
            }
        }
    }

    async addUserBalance({ userId, amount, symbol }: { userId: string, amount: number, symbol: string}) {
        try {
            let newCoinsAmount = 0;
            switch (symbol) {
                case 'BTC':
                    const res = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    const btcPrice = res.data.bpi.USD.rate_float
                    newCoinsAmount = amount * btcPrice
                    console.log('addUserBalance: btc: ', newCoinsAmount)
                    break;
                case 'LTC':
                    const ltc = await axios.get('https://api.coincap.io/v2/rates/litecoin')
                    const ltcPrice = ltc.data.data.rateUsd
                    newCoinsAmount = amount * ltcPrice
                    console.log('newCoinsAmount added: ', newCoinsAmount)
                    console.log('ltcPrice: ', ltcPrice)
                    // console.log('addduserbalance: ltc: ', ltc)
                    break;
                default:
                    throw new Error('Invalid symbol')
            }

            console.log('newBalance: ', newCoinsAmount)

            newCoinsAmount = newCoinsAmount * 100;

            const balance = await prisma.balance.update({
                where: {
                    userId: userId
                },
                data: {
                    amount: {
                        increment: newCoinsAmount
                    }
                },
                select: {
                    amount: true
                }
            })

            return balance.amount
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error adding user balance');
            }
        }
    }

    async getCryptoWalletIdByUserIdAndSymbol({ userId, symbol }: { userId: string, symbol: string }):
    Promise<{
        id: string,
        address: string
    } | null> {
        try {

            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: userId,
                    currency: symbol
                },
                select: {
                    id: true,
                    address: true
                }
            })

            if (!wallet || !wallet.id || !wallet == undefined) {
                throw new Error('Wallet not found')
            }

            return {
                id: wallet.id,
                address: wallet.address
            } as {
                id: string,
                address: string
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error checking deposit status');
            }
        }
    }

    async updateCheckCooldown({ userId }: { userId: string }) {
        try {
            if (!userId || userId == undefined) {
                throw new Error('User not found')
            }

            const cooldown = await prisma.depositCheckCooldown.findFirst({
                where: {
                    userId: userId
                }
            })

            if (!cooldown) {
                await prisma.depositCheckCooldown.create({
                    data: {
                        userId: userId,
                        updatedAt: new Date()
                    }
                })

                return
            }

            await prisma.depositCheckCooldown.update({
                where: {
                    userId: userId
                },
                data: {
                    updatedAt: new Date()
                }
            })

            return
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error checking deposit status');
            }
        }
    }

    async updateWalletBalanceByWalletId({ walletId, amount }: { walletId: string, amount: number }) {
        try {
            const wallet = await prisma.wallet.update({
                where: {
                    id: walletId
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            })

            if (!wallet) {
                throw new Error('Error updating wallet')
            }

            return wallet
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error updating wallet balance');
            }
        }

    }

    async updateWalletByAddress({ address, amount, symbol }: { address: string, amount: number, symbol: string }) {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: {
                    address: address,
                    currency: symbol
                }
            })

            if (!wallet) {
                throw new Error('Wallet not found')
            }

            const updatedWallet = await prisma.wallet.update({
                where: {
                    id: wallet.id
                },
                data: {
                    balance: {
                        increment: amount
                    },
                    totalReceived: {
                        increment: amount
                    }
                }
            })

            if (!updatedWallet) {
                throw new Error('Error updating wallet')
            }

            return updatedWallet
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error updating user balance');
            }
        }
    }

    async checkIfNoCooldown({ userId }: { userId: string }) {
        try {
            const cooldown = await prisma.depositCheckCooldown.findFirst({
                where: {
                    userId: userId,
                    updatedAt: {
                        gte: new Date(new Date().getTime() - 60 * 1000)
                    }
                }
            })

            if (cooldown) {
                return true
            }

            return false
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error checking deposit status');
            }
        }
    }

    async getAllWalletsBySymbol({ symbol }: { symbol: string }) {
        try {
            const wallets = await prisma.wallet.findMany({
                where: {
                    currency: symbol
                }
            })

            return wallets
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error checking deposit status');
            }
        }
    }

    

    private extractMasterKeys(rootNode: any) {
        try {
            const xprvKey = rootNode.toBase58()

            const xpubNode = rootNode.neutered()
            const xpubKey = xpubNode.toBase58()

            return { 
                MasterPrivateKey: xprvKey, 
                MasterPublicKey: xpubKey 
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    
}