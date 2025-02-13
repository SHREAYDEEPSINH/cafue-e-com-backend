const express = require("express");
const UserModel = require("../models/userModel");
const CartModel = require("../models/cartModel");
const auth = require("../middleware/auth");
const cartRouter = express.Router();


// cartRouter.get("/", auth, async (req, res) => {
//     try {
//       // `auth` middleware se `req.body.cartId` me userId aa raha hoga
//       const userId = req.body.cartId;
  
//       // Find carts for the logged-in user
//       const carts = await CartModel.find({cartId : userId});
//         console.log("carts" , carts)
//       res.status(200).json({ carts });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to fetch carts", error: error.message });
//     }
//   });

// cartRouter.post("/addcart", auth, async (req, res) => {
//     try {
//         const newcart = new CartModel({
//             cartId: req.body.cartId,
//             cartName: req.body.cartName,
//         });

//         await CartModel.create(newcart)
//         res.status(201).json({ message: "cart added successfully", newcart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to add cart", error: error.message });
//     }
// });


// Get all cart items for a user
cartRouter.get("/", auth, async (req, res) => {
    try {
        const userId = req.body.cartId;
        const carts = await CartModel.find({ cartId: userId });
        res.status(200).json({ carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch carts", error: error.message });
    }
});

// Add item to cart
cartRouter.post("/addcart", auth, async (req, res) => {
    try {
        const { productId, productName, productPrice, quantity } = req.body;
        const userId = req.body.cartId; 

        const newCartItem = new CartModel({
            cartId: userId,
            productId,
            productName,
            productPrice,
            quantity: quantity || 1
        });

        await CartModel.create(newCartItem)
        res.status(201).json({ message: "Cart item added successfully", newCartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add cart item", error: error.message });
    }
});



cartRouter.delete("/deletecart/:id" , async (req,res)=>{
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "cart deletes successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

cartRouter.put("/editcart/:id" , async (req,res)=>{
    try {
        await CartModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "cart edited successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = cartRouter

