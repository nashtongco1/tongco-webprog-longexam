const Supplier = require("../models/Supplier");

const createSupplier = async (req, res) => {
    try {
        const {
            name,
            contactPerson,
            email,
            phone,
            address
        } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Supplier name is required"
            });
        }

        const supplier = await Supplier.create({
            name,
            contactPerson,
            email,
            phone,
            address
        });

        res.status(201).json({
            message: "Supplier created successfully",
            supplier
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ name: 1 });

        res.status(200).json(suppliers);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createSupplier,
    getSuppliers
};