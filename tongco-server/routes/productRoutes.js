const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createProduct
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updateProduct
);

module.exports = router;