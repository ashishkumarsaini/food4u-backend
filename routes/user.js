const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticate } = require('../controllers/auth');
const { getUserById, getUser, updateUser, getPurchasedOrders } = require('../controllers/user');

router.param('userId', getUserById);

router.get('/user/:userId',isSignedIn, getUser);
router.put('/user/:userId',isSignedIn,isAuthenticate, updateUser);
router.get('/user/:userId/orders', isSignedIn, getPurchasedOrders);

module.exports = router;
