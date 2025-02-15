const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const auth = require("./middleware/auth");
const cors = require("cors");
const cartRouter = require("./routes/cartRouter");
const productRouter = require("./routes/productRouter");
const path = require("path")


dotenv.config()
const app = express()
app.use(express.json())

app.use(express.urlencoded())
app.use(cors({ origin: "*" }));

app.get("/" , async (req,res)=>{
   await res.send("Hello server")
})

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(auth)
app.use("/cart", cartRouter)



app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        connection()
        console.log(`server run on ${process.env.PORT}`)
    }
})