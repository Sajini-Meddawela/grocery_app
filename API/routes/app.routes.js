const categoryController = require('../controllers/categories.controllers');    
const expresss = require('express');
const router = expresss.Router();

router.post('/category', categoryController.create);
router.get('/category', categoryController.findAll);
router.get('/category/:id', categoryController.findOne);
router.put('/category:/id', categoryController.update);
router.delete('/category/:id', categoryController.delete);

module.exports = router;