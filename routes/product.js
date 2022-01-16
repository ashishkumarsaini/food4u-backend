const express = require('express');
const { isSignedIn, isAdmin, isAuthenticate, isSuperAdmin } = require('../controllers/auth');
const { createProduct, getProductById, getProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/product');
const { getUserById } = require('../controllers/user');

const router = express.Router();

router.param('userId', getUserById);
router.param('productId', getProductById);


router.get('/allproducts', getAllProducts)
router.get('/product/:productId', getProduct);
router.post('/product/create/:userId', isSignedIn, isAuthenticate, isAdmin, createProduct);
router.put('/product/update/:productId/:userId',isSignedIn, isAuthenticate, isAdmin, updateProduct);
router.delete('/product/delete/:productId/:userId', isSignedIn, isAuthenticate, isSuperAdmin, deleteProduct);

module.exports = router;
