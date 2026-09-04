const bcrypt = require("bcryptjs");
const User = require("../models/User");


// CUSTOMER - VIEW PROFILE
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// CUSTOMER - EDIT PROFILE INFORMATION
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });

            if (emailExists) {
                return res.status(400).json({
                    message: "Email is already in use"
                });
            }
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// CUSTOMER - CHANGE PASSWORD
const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "New password must be at least 6 characters"
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ADMIN - VIEW ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ADMIN - EDIT USER
const updateUser = async (req, res) => {
    try {
        const {
            name,
            email,
            role,
            isActive
        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (role !== undefined) {
            if (!["customer", "admin"].includes(role)) {
                return res.status(400).json({
                    message: "Invalid role"
                });
            }

            user.role = role;
        }

        if (isActive !== undefined) {
            user.isActive = isActive;
        }

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    updateUser
};