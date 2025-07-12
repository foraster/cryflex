import { $host } from "./index"

export const buyCrypto = async (userId, symbol, amount, price) => {
    const { data } = await $host.post('api/trade/buy', {
        "userId": userId, 
        "symbol": symbol,
        "amount": amount,
        "price": price
    })
    return data;
}

export const sellCrypto = async (userId, symbol, amount, price) => {
    const { data } = await $host.post('api/trade/sell', {
        "userId": userId, 
        "symbol": symbol,
        "amount": amount,
        "price": price
    })
    return data;
}