const express = require("express");

const {
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    updateUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// CUSTOMER PROFILE
router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfile
);

router.put(
    "/change-password",
    protect,
    changePassword
);


// ADMIN USER MANAGEMENT
router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getAllUsers
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updateUser
);


// RBAC TEST ROUTE
router.get(
    "/admin-only",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Welcome Admin"
        });
    }
);

module.exports = router;