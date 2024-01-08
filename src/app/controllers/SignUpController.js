const User = require('../models/User');


class SignUpController {
    // [GET] /signup
    index(req, res, next) {
        res.render('signup');
    }

    // [POST] /signup
    signUp(req, res, next) {
        const account = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            level: req.body.level,
        }
        User.findOne({ username: req.body.username })
            .then((checking) => {
                if (checking && checking.username === req.body.username) {
                    res.send("Tên tài khoản đã tồn tại");
                } else {
                    User.insertMany([account]);
                    res.send('Đăng kí thành công');
                }
            })
            .catch(next)
          
    }
}

module.exports = new SignUpController();
