const multer = require('multer');
const Path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const acceptableExt = [".png", ".jpg", ".jpeg","svg"];
    if (!acceptableExt.includes(Path.extname(file.originalname))) {
        return cb(new Error('Only images are allowed!'));
    }

    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1000000) {
        return cb(new Error('File size too large!'));
    }
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileSize: 1000000,
    fileFilter: fileFilter,
});

module.exports = upload.single('productImage');