const express = require("express");

const {
    createReview,
    getReviews,
    updateReview
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getReviews);

router.post(
    "/",
    protect,
    authorizeRoles("customer"),
    createReview
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updateReview
);

module.exports = router;