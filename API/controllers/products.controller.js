const productService = require('../services/products.service');
const upload = require('../middleware/product.upload'); 

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
           next(err);
        }
        else{
            const path = 
            req.file != undefined ? req.file.path.replace("\\", "/") : ""; 
            
            var model = {
                productName: req.body.productName,
                category: req.body.category,
                productShortDescription: req.body.productShortDescription,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productSalePrice: req.body.productSalePrice,
                productSKU: req.body.productSKU,
                productType: req.body.productType,
                stockStatus: req.body.stockStatus,
                productImage: path != "" ? "/" + path : "",
            };
            productService.createProduct(model, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Product added successfully",
                    data: result
                });
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        productName: req.query.productName,
        categoryId: req.query.categoryId,
        pageSize: req.query.pageSize,
        page: req.query.page,
        sort: req.query.sort,
    };
    productService.getProducts(model, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Product retrieved successfully",
            data: result
        });
    });
}


exports.findOne = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };
    productService.getProductById(model, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Product retrieved successfully",
            data: result
        });
    });
}

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
           next(err);
        }
        else{
            const path = 
            req.file != undefined ? req.file.path.replace("\\", "/") : ""; 
            
            var model = {
                productId: req.params.id,
                productName: req.body.productName,
                category: req.body.category,
                productShortDescription: req.body.productShortDescription,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productSalePrice: req.body.productSalePrice,
                productSKU: req.body.productSKU,
                productType: req.body.productType,
                stockStatus: req.body.stockStatus,
                productImage: path != "" ? "/" + path : "",
            };
            productService.updateProduct(model, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Product updated successfully",
                    data: result
                });
            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };
    productService.deleteProduct(model, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Product deleted successfully",
            data: result
        });
    });
}