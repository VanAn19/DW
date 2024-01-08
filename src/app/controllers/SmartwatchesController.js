const Smartwatches = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SmartwatchesController {
    // [GET] /smartwatches
    index(req, res, next) {
        Smartwatches.find({ type : 'Smartwatch' })
        .then((smartwatches) => {   
            res.render('smartwatches/index', {
                smartwatches: mutipleMongooseToObject(smartwatches),
            });
        })
        .catch(next);
    }
}

module.exports = new SmartwatchesController();