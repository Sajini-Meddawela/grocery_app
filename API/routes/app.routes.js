const categoryController = require('../controllers/categories.controllers');  
const productController = require('../controllers/products.controller');
const expresss = require('express');
const router = expresss.Router();

router.post('/category', categoryController.create);
router.get('/category', categoryController.findAll);
router.get('/category/:id', categoryController.findOne);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);

router.post('/product', productController.create);
router.get('/product', productController.findAll);
router.get('/product/:id', productController.findOne);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.delete);

module.exports = router;