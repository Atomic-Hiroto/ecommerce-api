// Imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./config/swagger.json');
const rateLimit = require('express-rate-limit');

// Limiter Middleware for Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // limit each IP to 100 requests  
});

// Routers
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// Middlewares and Config
dotenv.config();
const app = express();
app.use(limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());


// Base Routes
app.get("/", (req, res) => {
    res.send("<h1>E-commerce API</h1><p>Check out the readme docs or the swagger documentation at /api-docs route</p>")
});

// Routes
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found" });
});


// Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    try {
        connectDB();
    } catch (error) {
        console.log(error);
    }
    console.log(`Server start on http://localhost:${PORT}`);
});
