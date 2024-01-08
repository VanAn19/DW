const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class StatisticController {
    // [GET] /statistic
    index(req, res, next) {
        res.render('statistic/index');
    }

    typeProduct(req, res, next) {
        Product.aggregate([ { $group: { _id: '$type', total: { $sum: 1 } } } ]).exec()
        .then((result) => {
            const labels = result.map(item => item._id);
            const data = result.map(item => item.total);

            const jsonData = { labels, data };
            const jsonString = JSON.stringify(jsonData);

            res.render('statistic/type-products', { 
                products: result, 
                jsonData: jsonString,
            });
        })
        .catch(next);
    }

    soldProduct(req, res, next) {
        Product.find({ soldQuantity: { $gt: 0 } }).exec()
        .then((result) => {
            const labels = result.map(item => item.name); 
            const data = result.map(item => item.soldQuantity);

            const jsonData = { labels, data };
            const jsonString = JSON.stringify(jsonData);

            // console.log("result>>>>>>>>>>>>>>>>>>>: ", result);

            res.render('statistic/sold-products', {
                soldProducts: mutipleMongooseToObject(result),
                jsonData: jsonString,
            });
        })
        .catch(next)
    }

}

module.exports = new StatisticController();

