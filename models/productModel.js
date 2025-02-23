const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path")
// const fs = require('fs');

// const uploadDir = path.join(__dirname, "..", imagePath);

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const imagePath = "uploads"


const productSchema = mongoose.Schema({
    image: {
        type: String,
        require: true,
    },
    productname: {
        type: String,
        required: true,
    },
    productdetails: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }

})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir)

//         console.log('Image Upload Path:', path.join(__dirname, "..", imagePath));

//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })


// productSchema.statics.imageUpload = multer({ storage: storage }).single("image")
// productSchema.statics.imagePath = imagePath;

const ProductModel = mongoose.model("productDatabase", productSchema);

module.exports = ProductModel;