const Sunglasses = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SunglassesController {
    // [GET] /sunglasses
    index(req, res, next) {
        Sunglasses.find({ type : 'Sunglasses' })
        .then((sunglasses) => {   
            res.render('sunglasses/index', {
                sunglasses: mutipleMongooseToObject(sunglasses),
            });
        })
        .catch(next);
    }
}

module.exports = new SunglassesController();