const express = require("express");

const {
    createCategory,
    getCategories
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getCategories);

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createCategory
);

module.exports = router;