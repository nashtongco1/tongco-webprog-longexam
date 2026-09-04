const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./tongco-server/config/db");
const User = require("./tongco-server/models/User");

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({
            email: "admin@gmail.com"
        });

        if (existingAdmin) {
            console.log("Admin account already exists");
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        await User.create({
            name: "Bulldogs Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin",
            isActive: true
        });

        console.log("Admin account created successfully");

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

createAdmin();