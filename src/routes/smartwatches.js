const express = require('express');
const router = express.Router();

const smartwatchesController = require('../app/controllers/SmartwatchesController');
const productController = require('../app/controllers/ProductController');

router.get('/:slug', productController.show);
router.get('/', smartwatchesController.index);

module.exports = router;