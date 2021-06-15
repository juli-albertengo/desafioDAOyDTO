const mongoose = require('mongoose');

const product = 'product';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    category: {type: String, required: true},
    description: {type: String, required: true},
    foto: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
})

const productModel = mongoose.model(product, productSchema);

module.exports = {productModel};