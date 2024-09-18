import axios from "axios"
import { cryptoCurrencies, validCryptoCurrencies } from "../config/lists"



export const calculateBitcoinAmountOfMoney = (amount: number) => {
    const bitcoinAmount = axios.get(`https://blockchain.info/tobtc?currency=USD&value=${amount}`)

    if (!bitcoinAmount) {
        throw new Error('Error getting bitcoin amount')
    }

    console.log('bitcoinAmount: ', bitcoinAmount)

    return bitcoinAmount
}

// export const calculateUSDOfBitcoin = async (amount: number) => {
//     const response = await axios.get('https://api.blockchain.com/v3/exchange/tickers/BTC-USD')

//     if (!response) {
//         throw new Error('Error getting exchange rate')
//     }

//     const bitcoinPrice = response.data.price_24h

//     return bitcoinPrice * amount
// }

export const calculateCryptoCurrencyPrice = async (amount: number, currency: string) => {
    if (!validCryptoCurrencies.includes(currency)) {
        throw new Error('Invalid currency')
    }

    const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${currency}-USD`)

    if (!response) {
        throw new Error('Error getting exchange rate')
    }

    const currencyPrice = response.data.price_24h

    return currencyPrice * amount
}
