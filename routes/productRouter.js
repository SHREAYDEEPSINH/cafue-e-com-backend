const express = require("express");
const ProductModel = require("../models/productModel");
const productRouter = express.Router();
const fs = require("fs");




productRouter.get("/getAllProducts" , async (req , res)=>{
    try {
        const productData =await ProductModel.find({});
        console.log(productData , "productData")
        res.status(200).json({ productData });
    } catch (error) {
        console.log(error)
    }
})



productRouter.post("/insertProductData" , async (req ,res)=>{
    try {
        // console.log(req.file ,"file ")
        // if(req.file){
        //     req.body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        // }
        await ProductModel.create(req.body);
        console.log("data added successfully");

    } catch (error) {
        console.log(error);
    }
})

productRouter.delete("/deleteData/:id" , async (req ,res)=>{
    console.log(req.params.id)

    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deletes successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = productRouter




// productRouter.get("/editData/:id" , async (req,res)=>{

//     let storeData = await UserModel.findById(req.params.id);
//     console.log(storeData);

//     res.render("editData" , {storeData});
// })


// productRouter.post("/updateData/:id" ,async (req,res) =>{

//     try {
//         await UserModel.findByIdAndUpdate(req.params.id, req.body);
//         console.log("Data updated successfully");
//         res.redirect("/");
//     } catch (err) {
//         console.log(err);
//     }
// })