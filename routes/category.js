const express = require('express');
const { createCategory, getCategory, getCategoryById, getAllCategories, deleteCategory, updateCategory } = require('../controllers/category');
const { isSignedIn, isAuthenticate, isAdmin, isSuperAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

const router = express.Router();

router.param('categoryId', getCategoryById);
router.param('userId', getUserById);

router.get('/category/:categoryId', getCategory);
router.get('/allcategories', getAllCategories);
router.post('/category/create/:userId', isSignedIn, isAuthenticate, isAdmin, createCategory);
router.put('/category/update/:categoryId/:userId', isSignedIn, isAuthenticate, isAdmin, updateCategory);
router.delete('/category/delete/:categoryId/:userId', isSignedIn, isAuthenticate, isSuperAdmin, deleteCategory);

module.exports = router;
