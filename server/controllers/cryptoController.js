const CMCRequest = require("../utils/CMCRequest");

class CryptoController {
    async getCryptoBySymbol(req, res) {
        try{
            const symbol = req.params.symbol.toUpperCase();
            const data = await CMCRequest(`quotes/latest?symbol=${symbol}`, {symbol})
            res.status(200).json(data.data[symbol].quote)
        } catch(error){
            res.status(error.status || 500).json({error: error.message })
        }
    }

    async getAllCrypto(req, res) {
        try {
            const data = await CMCRequest(`listings/latest`)
            const cryptos = data.data.map(crypto => ({
                id: crypto.id,
                name: crypto.name,
                symbol: crypto.symbol,
                tags: crypto.tags,
                price: crypto.quote.USD.price,
                marketCap: crypto.quote.USD.market_cap,
                change24h: crypto.quote.USD.percent_change_24h,          
            }))
            res.status(200).json(cryptos);
        } catch (error) {
            console.error('Error occurred during loading cryptocurrencies:', error)
            res.status(error.status || 500).json({error: error.message || 'Unknown error'})
        }
    }

}

module.exports = new CryptoController();