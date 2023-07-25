const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests  
});

const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

dotenv.config();

const app = express();
app.use(limiter);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Working");
});
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    try {
        connectDB();
    } catch (error) {
        console.log(error);
    }
    console.log(`Server start on http://localhost:${PORT}`);
});
