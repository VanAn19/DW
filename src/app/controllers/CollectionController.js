const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mongoose');

class CollectionController {
    // [GET] /collection
    index(req, res, next) {
        res.render('collection/index');
    }
}

module.exports = new CollectionController();