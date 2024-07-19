const categoriesService = require("../services/categories.service");
const upload = require("../middleware/category.upload");

function normalizeKeys(obj) {
    const newObj = {};
    for (let key in obj) {
        const newKey = key.replace(/:$/, '');
        newObj[newKey] = obj[key];
    }
    return newObj;
}

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        } 
        const normalizedBody = normalizeKeys(req.body);
        const path = req.file ? req.file.path.replace(/\\/g, "/") : "";
        const model = {
            categoryName: normalizedBody.categoryName,
            categoryDescription: normalizedBody.categoryDescription,
            categoryImage: path ? "/" + path : "",
        };
        categoriesService.createCategory(model, (error, result) => {
            if (error) {
                return next(error);
            }
            return res.status(200).send({
                message: "Category created successfully",
                data: result,
            });
        });
    });
};

exports.findAll = (req, res, next) => {
    const model = {
        categoryName: req.query.categoryName,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };
    categoriesService.getCategories(model, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Categories retrieved successfully",
            data: result,
        });
    });
};

exports.findOne = (req, res, next) => {
    const model = {
        categoryId: req.params.id,
    };
    categoriesService.getCategoryById(model, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Category retrieved successfully",
            data: result,
        });
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }
        const normalizedBody = normalizeKeys(req.body);
        const path = req.file ? req.file.path.replace(/\\/g, "/") : "";
        const model = {
            categoryId: req.params.id,
            categoryName: normalizedBody.categoryName,
            categoryDescription: normalizedBody.categoryDescription,
            categoryImage: path ? "/" + path : "",
        };
        categoriesService.updateCategory(model, (error, result) => {
            if (error) {
                return next(error);
            }
            return res.status(200).send({
                message: "Category updated successfully",
                data: result,
            });
        });
    });
};

exports.delete = (req, res, next) => {
    const model = {
        categoryId: req.params.id,
    };
    categoriesService.deleteCategory(model, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Category deleted successfully",
            data: result,
        });
    });
};
