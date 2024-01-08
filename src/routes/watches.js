const express = require('express');
const router = express.Router();

const watchesController = require('../app/controllers/WatchesController');
const productController = require('../app/controllers/ProductController');

router.get('/:slug', productController.show);
router.get('/', watchesController.index);

module.exports = router;