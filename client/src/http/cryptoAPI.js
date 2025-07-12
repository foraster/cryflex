import { $host } from "./index";

export const getList = async () => {
    const {data} = await $host.get('api/crypto/listings')
    return data;
}

export const getOne = async (symbol) => {
    const {data} = await $host.get(`api/crypto/info/${symbol}`)
    return data;
}