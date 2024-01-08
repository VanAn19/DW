const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class CartController {
    // [GET] /
    index(req, res, next) {
        // console.log("userId>>>>>>>>>>>>>>>>>>>>>>>>: ", req.session.userId);
        // res.locals.userId = req.session.userId;
        // if (req.session.userId) {
        //     Cart.find({ userId: req.session.userId, status: "00" })
        //     .then((cart) => {   
        //         res.render('cart/cart', {
        //             cart: mutipleMongooseToObject(cart),
        //         });
        //     })
        //     .catch(next);
        // } else {
        //     res.status(400).send("Chưa đăng nhập");
        // }
        Cart.find({ userId: req.session.userId, status: "00" })
            .then((cart) => {   
                res.render('cart/cart', {
                    cart: mutipleMongooseToObject(cart),
                });
            })
            .catch(next);
    }

    // [POST] /cart/store
    store(req, res, next) {
        // if (req.session.userId) {
        //     const product = new Cart(req.body);
        //     product
        //         .save()
        //         .then(() => res.redirect('/cart'))
        //         .catch(next)
        // } else {
        //     res.status(400).send("Chưa đăng nhập");
        // }
        const product = new Cart(req.body);
            product
                .save()
                .then(() => res.redirect('/cart'))
                .catch(next)
    }

    // [POST] /cart/order
    order(req, res, next) {
        // const product = new Order(req.body);
        // product
        //     .save()
        //     .then() 
        //     .catch(next);
        // console.log("product>>>>>>>>>>>>>>>>>>>>>>>:", product);
        // Cart.find({status: "00"})
        // .then((cart) => {   
        //     return mutipleMongooseToObject(cart);
        // }).then(function(result) {
        //     console.log("cart>>>>>>>>>>>>>>>>>>>>>>>:", result);
        //     for (let index = 0; index < result.length; index++) {
        //         const element = result[index];
        //         console.log("result>>>>>>>>>>>>>>>>>>>>>>>:" + index + "---", element);
        //         element.status = "01";
        //         element.orderId = product._id;
        //         // element.total = product.quantity * product.price;
        //         Cart.updateOne({ _id: element._id }, element)
        //         .then(() => res.redirect(`/order/${element.orderId}`))
        //         .catch(next);
        //     }
        // });
        const product = new Order(req.body);
        let cartItems; 

        product
            .save()
            .then(() => Cart.find({ status: "00" }))
            .then((cart) => {
                cartItems = mutipleMongooseToObject(cart);
                return Promise.all(cartItems.map(element => 
                    Product.findById(element.productId)
                        .then((foundProduct) => {
                            if (foundProduct) {
                                if (element.quantity > foundProduct.quantity) {
                                    return res.status(400).send(`Không đủ hàng cho sản phẩm "${foundProduct.name}"`);
                                }
                                foundProduct.quantity -= element.quantity;
                                foundProduct.soldQuantity = (foundProduct.soldQuantity || 0) + element.quantity;
                                return foundProduct.save();
                            }
                        })
                ));
            }).then(() => {
                const updateCart = cartItems.map((element) => {
                    element.status = "01";
                    element.orderId = product._id;
                    // element.userId = req.session.userId; 
                    return Cart.updateOne({ _id: element._id }, element);
                });
                return Promise.all(updateCart);
            })
            .then(() => res.redirect(`/order/${product._id}`))
            .catch(next);
    }

    // [POST] /cart/:id
    delete(req, res, next) {
        Cart.deleteOne({ _id: req.params.id }) 
            .then(() => res.redirect('back'))
            .catch(next)
        }

}

module.exports = new CartController();
