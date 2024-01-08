const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const session = require('express-session');

const hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        multiply: (a, b) => a * b,
        ifCond: (v1, v2, options) => {
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        },
        totalOrderAmount: cart => {
            let totalAmount = 0;
            for (let i = 0; i < cart.length; i++) {
                totalAmount += cart[i].price * cart[i].quantity;
            }
            return totalAmount;
        },
        isCurrentPage: (currentPage, checkPage) => {
            return currentPage === checkPage;
        }
    },
});

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
}));

// http logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
