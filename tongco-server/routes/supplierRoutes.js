const express = require("express");

const {
    createSupplier,
    getSuppliers
} = require("../controllers/supplierController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getSuppliers);

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createSupplier
);

module.exports = router;