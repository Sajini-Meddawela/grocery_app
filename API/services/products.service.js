const { Product } = require('../models/product.model'); 
const { Category } = require('../models/category.model'); 
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createProduct(params, callback) {
    if (!params.productName) {
        return callback({
            message: 'Product name required'
        }, '');
    }
    if (!params.category) {
        return callback({
            message: 'Category required'
        }, '');
    }

    try {
        const category = await Category.findOne({ categoryName: params.category });
        if (!category) {
            return callback({
                message: 'Category does not exist'
            }, '');
        }

        const productModel = new Product({
            productName: params.productName,
            category: category._id, // Assign the category ID
            productShortDescription: params.productShortDescription,
            productDescription: params.productDescription,
            productPrice: params.productPrice,
            productSalePrice: params.productSalePrice,
            productSKU: params.productSKU,
            productType: params.productType,
            stockStatus: params.stockStatus,
            productImage: params.productImage
        });

        const savedProduct = await productModel.save();
        return callback(null, savedProduct);
    } catch (error) {
        return callback(error);
    }
}

async function getProducts(params, callback) {
    const productName = params.productName;
    const categoryId = params.categoryId;
    var condition = {};
    if (productName) {
        condition["productName"] = {
            $regex: new RegExp(productName),
            $options: "i"
        };
    }
    if (categoryId) {
        condition["category"] = categoryId;
    }
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
    let page = (Math.abs(params.page) || 1) - 1;

    Product
        .find(condition, "productId productName productShortDescription productPrice productSalePrice productImage productSKU productType stockStatus createdAt updatedAt")
        .sort(params.sort)
        .populate("category", "categoryName categoryImage")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


async function getProductById(params, callback) {
    const productId = params.productId;

    Product
        .findById(productId)
        .populate("category", "categoryName categoryImage")
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateProduct(params, callback) {
    const productId = params.productId;

    Product
        .findByIdAndUpdate(productId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback(`Cannot update product with id ${productId}`);
            }
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteProduct(params, callback) {
    const productId = params.productId;

    Product
        .findByIdAndDelete(productId)
        .then((response) => {
            if (!response) {
                callback(`Cannot delete product with id ${productId}`);
            }
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
