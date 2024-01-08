const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

const Cart = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId },
    name: {type: String, require: true},
    quantity: { type: Number, require: true, min: 1 },
    price: { type: Number, require: true },
    color: { type: String, require: true },
    image: { type: String, require: true },
    size: { type: String, require: true },
    status: { type: String, require: true },
    total: { type: Number, require: true },
    username: { type: String },
    orderId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});

mongoose.plugin(slug);

module.exports = mongoose.model('Cart', Cart);