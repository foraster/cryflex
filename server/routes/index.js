const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cryptoRouter = require('./cryptoRouter');
const tradeRouter = require('./tradeRouter')

router.use('/user', userRouter);
router.use('/crypto', cryptoRouter);
router.use('/trade', tradeRouter)

module.exports = router