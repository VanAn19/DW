const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

const Order = new Schema({
    name: { type: String, require: true },
    quantity: { type: String, require: true },
    price: { type: String, require: true },
    status: { type: String, require: true },
    total: { type: Number, require: true },
    username: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId },
    cartId: { type: mongoose.Schema.Types.ObjectId },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);