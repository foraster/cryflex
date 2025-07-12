const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/buy', tradeController.buyCrypto);
router.post('/sell', tradeController.sellCrypto);

module.exports = router