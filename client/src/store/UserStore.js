import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._balanceUnits = 0;
        this._user = {};
        this._ownedCryptos = [];
        this._purchases = [];
        this._portfolioPage = 1;
        this._portfolioLimit = 10;
        this._isBuying = true;
        this._selectedCrypto = {};
        this._cryptoAmount = null;
        this._cash = null;

        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setBalance(balanceUnits) {
        this._balanceUnits = balanceUnits
    }

    setOwnedCryptos (ownedCryptos) {
        this._ownedCryptos = ownedCryptos;
    }

    setPurchases (purchases) {
        this._purchases = purchases;
    }

    setPortfolioPage (portfolioPage) {
        this._portfolioPage = portfolioPage;
    }

    setIsBuying(isBuying) {
        this._isBuying = isBuying;
    }

    setSelectedCrypto(selectedCrypto) {
        this._selectedCrypto = selectedCrypto;
    }

    setCryptoAmount(cryptoAmount) {
        this._cryptoAmount = cryptoAmount;
    }

    setCash(cash) {
        this._cash = cash;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get balance() {
        return this._balanceUnits;
    }

    get ownedCryptos() {
        return this._ownedCryptos;
    }

    get purchases() {
        return this._purchases;
    }

    get portfolioPage() {
        return this._portfolioPage;
    }
    
    get portfolioLimit() {
        return this._portfolioLimit;
    }
    
    get isBuying() {
        return this._isBuying;
    }

    get selectedCrypto() {
        return this._selectedCrypto;
    }

    get cryptoAmount() {
        return this._cryptoAmount;
    }

    get cash() {
        return this._cash;
    }

    reset() {
        this._isAuth = false;
        this._user = {};
        this._balanceUnits = 0;
        this._ownedCryptos = [];
        this._purchases = [];
        this._selectedCrypto = {};
        this._cryptoAmount = null;
        this._cash = null;
    }
}