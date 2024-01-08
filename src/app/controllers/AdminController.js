const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class AdminController {
    // [GET] /admin/create
    create(req, res, next) {
        res.render('admin/create');
    }

    // [POST] /admin/store
    store(req, res, next) {
        const { name } = req.body;
        Product.findOne({ name })
            .then(existingProduct => {
                if (existingProduct) {
                    return Promise.reject('Sản phẩm đã tồn tại. Vui lòng chọn tên khác.');
                }
                const product = new Product(req.body);
                return product.save();
            })
            .then(() => res.redirect('/admin/create'))
            .catch(err => {
                console.error(err);
                if (err === 'Sản phẩm đã tồn tại. Vui lòng chọn tên khác.') {
                    res.render('admin/create', { error: err });
                } else {
                    res.status(500).send('Đã xảy ra lỗi khi lưu sản phẩm.');
                }
            });
    }

    //  [GET] /admin/stored
    storedProduct(req, res, next) {
        const queryType = req.query.type ? { type: req.query.type } : {};
        Promise.all([Product.find(queryType), Product.countDocumentsWithDeleted({deleted:true})])
            .then(([products, deletedCount]) => {
                res.render('admin/stored-products', {
                    deletedCount,
                    products: mutipleMongooseToObject(products),
                })
            })
            .catch(next)
    }

    // [GET] /admin/trash
    trashProduct(req, res, next) {
        Product.findDeleted({})
            .then(products => res.render('admin/trash-products', {
                products: mutipleMongooseToObject(products),
            }))
            .catch(next)
    }

    // [GET] /admin/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('admin/edit', {
                product: mongooseToObject(product),
            }))
            .catch(next)
    }

    // [PUT] /admin/:id
    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/stored'))
            .catch(next)
    }

    // [DELETE] /admin/:id
    destroy(req, res, next) {
        Product.delete({ _id: req.params.id }) 
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /admin/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /getProducts
    async search(req, res, next) {
        // const queryType = req.query.type ? { type: req.query.type } : {};
        let payload = req.body.payload.trim();
        // console.log(payload);
        // const queryCondition = {
        //     ...queryType,
        //     name: { $regex: new RegExp('^' + payload + '.*', 'i') }
        // };
        let search = await Product.find({name: { $regex: new RegExp('^' + payload + '.*', 'i') }}).exec();
        // limit search results
        search = search.slice(0, 10);
        res.send({payload: search});
    }

    //  [GET] /admin/stored/:searchValue
    searchValue(req, res, next) {
        const searchValue = req.params.searchValue;
        Product.find({ name: searchValue})
        .then(products => res.render('admin/stored-products', {
            products: mutipleMongooseToObject(products),
        }))
        .catch(next);
    }
}

module.exports = new AdminController();