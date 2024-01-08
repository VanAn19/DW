const express = require('express');
const router = express.Router();

const sunglassesController = require('../app/controllers/SunglassesController');
const productController = require('../app/controllers/ProductController');

router.get('/:slug', productController.show);
router.get('/', sunglassesController.index);

module.exports = router;