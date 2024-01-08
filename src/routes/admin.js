const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/stored', adminController.storedProduct);
router.get('/trash', adminController.trashProduct);
router.get('/create', adminController.create);  
router.post('/store', adminController.store);
router.get('/:id/edit', adminController.edit);
router.put('/:id', adminController.update);
router.patch('/:id/restore', adminController.restore);
router.delete('/:id', adminController.destroy);
router.post('/getProducts', adminController.search);
router.get('/stored/:searchValue', adminController.searchValue);

module.exports = router;