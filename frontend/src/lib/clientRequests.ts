// import axios from "axios"
import axios from "axios";
import { SERVER_API_URL } from "./config"

const api = axios.create({
    baseURL: SERVER_API_URL,
    withCredentials: true
})

export async function getRecentLiveChatMessages() {
    const response = await api.get('/livechat/messages')

    if (!response) {
        throw new Error('Failed to fetch recent messages');
    }

    const messages = await response.data.messages;

     return messages
}

export async function getCryptoAddressByName(name: string) {
    const response = await api.get(`/crypto/${name}/address`)

    if (!response) {
        throw new Error('Failed to fetch crypto address');
    }

    const address = await response.data.address;

    return address
}

// getCryptoAddressBySymbol

export async function getCryptoAddressBySymbol(symbol: string) {
    const response = await api.get(`/crypto/address`, {
        params: {
            symbol: symbol
        }
    })

    if (!response) {
        throw new Error('Failed to fetch crypto address');
    }

    const address = await response.data.address;

    return address
}

export async function getCryptoDepositStatusBySymbol(symbol: string) {
    // const response = await api.post(`/crypto/deposit/check`, {
    //         symbol: symbol
    // })

    const response = await axios.post('/crypto/deposit/check', {
        symbol: symbol
    }, {
        withCredentials: true
    })

    

    if (!response) {
        throw new Error('Failed to fetch crypto address');
    }

    return response.data
}

export async function getUserBetTransactions(page: number = 1) {
    const response = await api.get(`/user/me/transactions?page=${page}`)

    if (!response) {
        throw new Error('Failed to fetch user bets');
    }

    return response.data
}

export async function getUserRole() {
    const response = await api.get('/user/me/role')

    if (!response) {
        throw new Error('Failed to fetch user role');
    }

    return response.data.role
}

export async function getWalletsForAdmin(page: number = 1) {
    const response = await api.get(`/user/admin/wallets?page=${page}`)

    if (!response) {
        throw new Error('Failed to fetch wallets');
    }

    return response.data.wallets
}

export async function logoutRequest() {
    const response = await api.post('/user/logout')

    if (!response) {
        throw new Error('Failed to logout');
    }

    return response.data
}

export async function withdrawCryptoFromWalletsBySymbol(symbol: string, toAddress: string) {
    const response = await axios.post('/user/admin/wallets/withdraw', {
        symbol: symbol,
        toAddress: toAddress
    }, {
        withCredentials: true
    })

    if (!response) {
        throw new Error('Failed to withdraw crypto');
    }

    return response.data
}

export async function getProfileData() {
    const response = await api.get('/user/me/stats')

    if (!response) {
        throw new Error('Failed to fetch profile data');
    }

    return response.data
}

export async function withdrawLitecoinFromBalance(amount: number, address: string) {
    const response = await axios.post('/crypto/litecoin/withdraw', {
        amount: amount,
        toAddress: address
    }, {
        withCredentials: true
    
    })

    if (!response) {
        throw new Error('Failed to withdraw litecoin');
    }

    return response.data
}

export async function withdrawBitcoinFromBalance(amount: number, address: string) {
    const response = await axios.post('/crypto/bitcoin/withdraw', {
        amount: amount,
        toAddress: address
    }, {
        withCredentials: true
    })

    if (!response) {
        throw new Error('Failed to withdraw bitcoin');
    }

    return response.data
}

export async function changeUserPassword(oldPassword: string, newPassword: string) {
    const response = await api.post('/user/me/password', {
        oldPassword: oldPassword,
        newPassword: newPassword
    })

    if (!response) {
        return new Error('Failed to change password');
    }

    return response.data
}

export async function changeUserAvatar(avatarId: string) {
    const response = await api.post('/user/me/avatar', {
        avatarId: avatarId
    })

    if (!response) {
        return new Error('Failed to change avatar');
    }

    return response.data
}

export async function claimCoinsReward() {
    const response = await api.post('/user/me/claim-reward')

    if (!response) {
        return new Error('Failed to claim coins reward');
    }

    return response.data
}