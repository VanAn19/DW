const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class OrderController {
    // [GET] /order
    index(req, res, next) {
        Order.find({ username: "an" })
            .then((order) => {   
                res.render('order/index', {
                    order: mutipleMongooseToObject(order),
                });
            })
            .catch(next);
    }

    // [GET] /order/:id
    show(req, res, next) {
        const getUser = () => User.find({ username: "an" })
            .then((user) => mutipleMongooseToObject(user));
        const getCart = () => Cart.find({ orderId: req.params.id })
            .then((cart) => mutipleMongooseToObject(cart));
        const getOrder = () => Order.find({ _id: req.params.id })
            .then((order) => {
                return mutipleMongooseToObject(order)
            });

        Promise.all([getUser(), getCart(), getOrder()])
            .then(([user, cart, order]) => {
                res.render('order/show', { 
                    user,
                    cart, 
                    order,
                })
            })
            .catch((error) => next(error));
    }

    // [POST] /order/buy/:id
    buy(req, res, next) {
        const orderId = req.params.id;
        const newStatus = req.body.status;

        if (newStatus !== "01") {
            return res.status(400).send("Trạng thái không hợp lệ");
        }

        Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true })
            .then(() => res.redirect(`/order/${orderId}`))
            .catch(next);
    }

}

module.exports = new OrderController();

