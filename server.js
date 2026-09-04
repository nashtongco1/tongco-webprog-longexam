const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./tongco-server/config/db");

const authRoutes = require("./tongco-server/routes/authRoutes");
const userRoutes = require("./tongco-server/routes/userRoutes");
const productRoutes = require("./tongco-server/routes/productRoutes");
const categoryRoutes = require("./tongco-server/routes/categoryRoutes");
const supplierRoutes = require("./tongco-server/routes/supplierRoutes");
const reviewRoutes = require("./tongco-server/routes/reviewRoutes");
const orderRoutes = require("./tongco-server/routes/orderRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Bulldogs Exchange API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});