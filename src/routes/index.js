const productsRouter = require('./products');
const collectionRouter = require('./collection');
const watchesRouter = require('./watches');
const jewelleriesRouter = require('./jewelleries');
const sunglassesRouter = require('./sunglasses');
const smartwatchesRouter = require('./smartwatches');
const adminRouter = require('./admin');
const signInRouter = require('./signIn');
const signUpRouter = require('./signUp');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const statisticRouter = require('./statistic');
const siteRouter = require('./site');

function route(app) {
    app.use('/statistic', statisticRouter);

    app.use('/order', orderRouter);

    app.use('/cart', cartRouter);

    app.use('/signup', signUpRouter);

    app.use('/signin', signInRouter);

    app.use('/admin', adminRouter);

    app.use('/smartwatches', smartwatchesRouter);

    app.use('/sunglasses', sunglassesRouter);

    app.use('/jewelleries', jewelleriesRouter);

    app.use('/watches', watchesRouter);

    app.use('/collection', collectionRouter);

    app.use('/products', productsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
