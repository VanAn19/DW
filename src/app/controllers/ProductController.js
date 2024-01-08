const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const PAGE_SIZE = 12;

class ProductController {
    // [GET] /products/:slug
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then((product) =>
                res.render('products/show', {
                    product: mongooseToObject(product),
                })
            )
            .catch(next);
    }

    // [GET] /products
    index(req, res, next) {
        var searchValue = req.query.searchValue || "";
        // console.log(searchValue);

        var page = req.query.page || 1;
        page = parseInt(page)
        if (page < 1) {
            page = 1
        }
        Product.countDocuments()
            .then((productsCount) => {
                var productsSkip = (page - 1) * PAGE_SIZE;
                var totalPages = Math.ceil(productsCount / PAGE_SIZE);
                var previousPage = page - 1;
                var nextPage = page + 1;

                if (searchValue === "") {
                    Product.find({})
                        .skip(productsSkip)
                        .limit(PAGE_SIZE)
                        .then((products) => {
                            res.render('products/index', {
                                products: mutipleMongooseToObject(products),
                                pages: Array.from({ length: totalPages }, (_, i) => i + 1),
                                previousPage,
                                nextPage,
                                currentPage: page,
                                totalPages,
                            });
                            // console.log(totalPages);
                        })
                        .catch(next);
                } else {
                    Product.find({ name: searchValue })
                        .skip(productsSkip)
                        .limit(PAGE_SIZE)
                        .then((products) => {
                            res.render('products/index', {
                                products: mutipleMongooseToObject(products),
                                pages: Array.from({ length: totalPages }, (_, i) => i + 1),
                                previousPage,
                                nextPage,
                                currentPage: page,
                                totalPages,
                            });
                            // console.log(totalPages);
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }
}

module.exports = new ProductController();