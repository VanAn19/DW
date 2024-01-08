const Jewellery = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class JewelleryController {
    // [GET] /Jewellery
    index(req, res, next) {
        Jewellery.find({ type : 'Jewellery' })
        .then((jewelleries) => {   
            res.render('jewelleries/index', {
                jewelleries: mutipleMongooseToObject(jewelleries),
            });
        })
        .catch(next);
    }
}

module.exports = new JewelleryController();