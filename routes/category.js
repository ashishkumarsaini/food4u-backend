const express = require('express');
const { createCategory, getCategory, getCategoryById, getAllCategories } = require('../controllers/category');
const { isSignedIn, isAuthenticate, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

const router = express.Router();

router.param('categoryId', getCategoryById);
router.param('userId', getUserById);

router.get('/category/:categoryId', getCategory);
router.get('/allcategories', getAllCategories);
router.post('/category/create/:userId', isSignedIn, isAuthenticate, isAdmin, createCategory);

module.exports = router;
