const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/validate', userController.validate);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/modify', userController.modify);
router.get('/auth', authMiddleware, userController.check);
router.get('/:userId/info', userController.getPersonalInfo);
router.get('/:userId/balance', userController.getBalance);
router.get('/:userId/portfolio', userController.getOwnedCryptos);
router.get('/:userId/purchases', userController.getPurchases)


module.exports = router