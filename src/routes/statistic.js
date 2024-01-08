const express = require('express');
const router = express.Router();

const statisticController = require('../app/controllers/StatisticController');

router.get('/statistic-type-products', statisticController.typeProduct);
router.get('/statistic-sold-products', statisticController.soldProduct);
router.get('/', statisticController.index);


module.exports = router;
