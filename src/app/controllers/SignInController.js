const User = require('../models/User');
const Product = require('../models/Product');

class SignInController {
    // [GET] /signin
    index(req, res, next) {
        res.render('signin');
    }

    // [POST] /signin
    signIn(req, res, next) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (user && user.password === req.body.password) {
                    req.session.userId = user.id;
                    res.redirect('/');
                } else {
                    res.send("Sai mật khẩu");
                }
            })
            .catch(next);  
    }
}

module.exports = new SignInController();
