const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});
//app.use("/api/products", productRouter);
//app.use("/api/orders", orderRouter);

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
