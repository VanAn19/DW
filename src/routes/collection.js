const express = require('express');
const router = express.Router();

const collectionController = require('../app/controllers/CollectionController');

router.get('/', collectionController.index);

module.exports = router;