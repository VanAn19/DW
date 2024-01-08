const Product = require('../models/Product');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const PAGE_SIZE = 3;
const numberOfProducts = 10;

class SiteController {
    // [GET] /
    index(req, res, next) {
        var page = req.query.page || 1;
        page = parseInt(page)
        if (page < 1) {
            page = 1
        }
        Product.countDocuments()
            .then((productsCount) => {
                var productsSkip = (page - 1) * PAGE_SIZE;
                // var totalPages = Math.ceil(productsCount / PAGE_SIZE);
                var previousPage = page - 1;
                var nextPage = page + 1;

                Product.find({})
                    .sort({ quantity: 1 })
                    .skip(productsSkip)
                    .limit(PAGE_SIZE)
                    .then((products) => {
                        res.render('home', {
                            products: mutipleMongooseToObject(products),
                            pages: Array.from({ length: 2 }, (_, i) => i + 1),
                            previousPage,
                            nextPage,
                            currentPage: page,
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
}

module.exports = new SiteController();
