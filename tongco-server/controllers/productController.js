const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            supplier,
            stock,
            image
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            !category ||
            !supplier ||
            stock === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all required product fields"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            supplier,
            stock,
            image
        });

        const populatedProduct = await Product.findById(product._id)
            .populate("category")
            .populate("supplier");

        res.status(201).json({
            message: "Product created successfully",
            product: populatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        const filter = {
            isActive: true
        };

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter)
            .populate("category")
            .populate("supplier")
            .sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category")
            .populate("supplier");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("category")
            .populate("supplier");

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct
};