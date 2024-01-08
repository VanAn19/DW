const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    soldQuantity: { type: Number },
    slug: { type: String, slug: 'name', unique: true },
  }, {
    timestamps: true,
  });

// add plugin
mongoose.plugin(slug);

Product.plugin(mongooseDelete, { 
  deletedAt : true,
  overrideMethods: 'all',
 });

module.exports = mongoose.model('Product', Product);
