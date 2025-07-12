const axios = require('axios')

const CMCRequest = async (endpoint) => {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/${endpoint}`;
        try{
            const response = await axios.get( url, {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
                },
            });
            return response.data
        } catch (error) {
            console.error('API request error:', error.message)
            if (error.response) {
                return res.status(500).json({ error: error.message });
            }
            throw {status: 500, message: error.message}
        }
};
module.exports = CMCRequest;