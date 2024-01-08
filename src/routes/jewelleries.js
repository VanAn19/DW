const express = require('express');
const router = express.Router();

const jewelleryController = require('../app/controllers/JewelleryController');
const productController = require('../app/controllers/ProductController');

router.get('/:slug', productController.show);
router.get('/', jewelleryController.index);

module.exports = router;