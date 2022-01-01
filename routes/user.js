const express = require('express');
const {
    getUserById, getUser, updateUser, purchasedOrderList,
} = require('../controllers/user');

const router = express.Router();
router.param('userId', getUserById);
router.get('/user/:userId', getUser);
router.put('/user/:userId', updateUser);
router.get('/user/:userId/orders', purchasedOrderList);

module.exports = router;
