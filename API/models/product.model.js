const mongoose = require('mongoose');
const { category } = require('./category.model');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    productShortDescription: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: false,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productSalePrice: {
        type: Number,
        required: true,
        default: 0,
    },
    productImage: {
        type: String
    },
    productSKU: {
        type: String,
        required: false,
    },
    productType: {
        type: String,
        required: true,
        default: 'Simple'
    },
    stockStatus: {
        type: String,
        default: 'In Stock'
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.productId = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        },
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
};
