const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/', cartController.index);
router.post('/store', cartController.store);
router.post('/order', cartController.order);
router.delete('/:id', cartController.delete);


module.exports = router;
