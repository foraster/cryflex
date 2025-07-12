import { makeAutoObservable } from "mobx";

export default class CryptoStore {
    constructor() {
        this._list = [];
        this._filteredList = [];
        this._sortedList = [];
        this._page = 1;
        this._limit = 8;
        this._currentCrypto = {};
        makeAutoObservable(this);
    }

    setCryptos(cryptos) {
        this._list = cryptos;
    }

    setFilteredList(filteredList) {
        this._filteredList = filteredList;
    }

    setSortedList(sortedList) {
        this._sortedList = sortedList;
    }

    setPage(page) {
        this._page = page;
    }

    setCurrentCrypto(crypto) {
        this._currentCrypto = crypto;
    }

    get list() {
        return this._list;
    }

    get filteredList() {
        return this._filteredList
    }
    
    get sortedList() {
        return this._sortedList
    }

    get page() {
        return this._page;
    }
    
    get limit() {
        return this._limit;
    }

    get currentCrypto() {
        return this._currentCrypto
    }

    async fetchCryptos(url) {
        try {
            const response = await fetch(url)
            const data = await response.json()
            this.setCryptos(data)
        } catch (error) {
            console.error('Error fetching cryptos:', error)
        }
    };
}