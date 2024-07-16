const { MONGO_DB_CONFIG } = require("../config/app.config");
const {category} = require("../models/category.model");

async function createCategory(params, callback) {
    if(!params.categoryName ||!params.categoryDescription) {
       return callback({
        message: "Category name and description are required"
       }, "");
    }
const model = new category(params);
model.save()
.then((response) => {
    return callback(null, response);
})
.catch((error) => {
    return callback(error);
})
}

async function getCategories(params, callback) {
    const categoryName = params.categoryName;
    var condition  = categoryName
    ? {
        categoryName: {
            $regex: new RegExp(categoryName),
            $options: "i"},
        }
    : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
    let page = (Math.abs(params.page) || 1) -1;

    category
    .find(condition,"categoryName categoryImage")
    .limit(perPage * page)
    .then((response) => {
         return callback(null, response);
     })
    .catch((error) => {
         return callback(error);
     })
}

async function getcategoryById(params, callback) {
    const categoryId = params.categoryId;   

    category
    .findById(categoryId)
    .then((response) => {
        if(!response) callback("Category not found"+ categoryId);
        else callback(null, response);
     })
    .catch((error) => {
         return callback(error);
     })
}

async function updateCategory(params, callback) {
    const categoryId = params.categoryId;   

    category
    .findByIdandUpdate(categoryId, params, {useFindAndModify: false})
    .then((response) => {
        if(!response) callback("Category not found"+ categoryId);
        else callback(null, response);
     })
    .catch((error) => {
         return callback(error);
     })
}

async function deleteCategory(params, callback) {
    const categoryId = params.categoryId;   

    category
    .findByIdandDelete(categoryId)
    .then((response) => {
        if(!response) callback("Category not found"+ categoryId);
        else callback(null, response);
     })
    .catch((error) => {
         return callback(error);
     })
}

module.exports = {
    createCategory,
    getCategories,
    getcategoryById,
    updateCategory,
    deleteCategory
}