const Review = require("../models/Review");
const Product = require("../models/Product");

const createReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;

        if (!product || !rating || !comment) {
            return res.status(400).json({
                message: "Product, rating, and comment are required"
            });
        }

        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const existingReview = await Review.findOne({
            product,
            user: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You already reviewed this product"
            });
        }

        const review = await Review.create({
            product,
            user: req.user._id,
            rating,
            comment
        });

        const populatedReview = await Review.findById(review._id)
            .populate("user", "name email")
            .populate("product", "name");

        res.status(201).json({
            message: "Review created successfully",
            review: populatedReview
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getReviews = async (req, res) => {
    try {
        const filter = {};

        if (req.query.product) {
            filter.product = req.query.product;
        }

        const reviews = await Review.find(filter)
            .populate("user", "name email")
            .populate("product", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (rating !== undefined) {
            review.rating = rating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        const updatedReview = await Review.findById(review._id)
            .populate("user", "name email")
            .populate("product", "name");

        res.status(200).json({
            message: "Review updated successfully",
            review: updatedReview
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createReview,
    getReviews,
    updateReview
};