const Watches = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class WatchesController {
    // [GET] /watches
    index(req, res, next) {
        Watches.find({ type : 'Watches' })
        .then((watches) => {   
            res.render('watches/index', {
                watches: mutipleMongooseToObject(watches),
            });
        })
        .catch(next);
    }
}

module.exports = new WatchesController();