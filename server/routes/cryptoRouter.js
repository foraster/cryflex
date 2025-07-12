const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/info/:symbol', cryptoController.getCryptoBySymbol);
router.get('/listings', cryptoController.getAllCrypto);

module.exports = router