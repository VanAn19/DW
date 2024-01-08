const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/', orderController.index);
router.get('/:id', orderController.show);
router.post('/buy/:id', orderController.buy);

module.exports = router;
