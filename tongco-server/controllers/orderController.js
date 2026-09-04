const Order = require("../models/Order");
const Product = require("../models/Product");


// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({
                message: "Product and valid quantity are required"
            });
        }

        const product = await Product.findById(productId);

        if (!product || !product.isActive) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Not enough product stock"
            });
        }

        let cart = await Order.findOne({
            user: req.user._id,
            status: "cart"
        });

        if (!cart) {
            cart = await Order.create({
                user: req.user._id,
                items: [],
                status: "cart"
            });
        }

        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: "Not enough product stock"
                });
            }

            existingItem.quantity = newQuantity;
            existingItem.price = product.price;

        } else {
            cart.items.push({
                product: product._id,
                quantity,
                price: product.price
            });
        }

        cart.totalAmount = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        await cart.save();

        const populatedCart = await Order.findById(cart._id)
            .populate("items.product", "name price image stock");

        res.status(200).json({
            message: "Product added to cart successfully",
            cart: populatedCart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// VIEW CART
const getCart = async (req, res) => {
    try {
        const cart = await Order.findOne({
            user: req.user._id,
            status: "cart"
        }).populate("items.product", "name price image stock");

        if (!cart) {
            return res.status(200).json({
                items: [],
                totalAmount: 0
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// CHECKOUT CART
const checkoutOrder = async (req, res) => {
    try {
        const cart = await Order.findOne({
            user: req.user._id,
            status: "cart"
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        for (const item of cart.items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "A product in the cart no longer exists"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }
        }

        for (const item of cart.items) {
            const product = await Product.findById(item.product);

            product.stock -= item.quantity;

            await product.save();
        }

        cart.status = "ongoing";

        await cart.save();

        const order = await Order.findById(cart._id)
            .populate("items.product", "name price image");

        res.status(200).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// CUSTOMER VIEW ONGOING ORDERS
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
            status: {
                $ne: "cart"
            }
        })
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ADMIN VIEW ALL ORDERS
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            status: {
                $ne: "cart"
            }
        })
            .populate("user", "name email")
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ADMIN CONFIRM ORDER
const confirmOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.status !== "ongoing") {
            return res.status(400).json({
                message: "Only ongoing orders can be confirmed"
            });
        }

        order.status = "confirmed";

        await order.save();

        res.status(200).json({
            message: "Order confirmed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ADMIN MARK ORDER READY
const markOrderReady = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.status !== "confirmed") {
            return res.status(400).json({
                message: "Order must be confirmed first"
            });
        }

        order.status = "ready";

        await order.save();

        res.status(200).json({
            message: "Order is ready for claiming",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    addToCart,
    getCart,
    checkoutOrder,
    getMyOrders,
    getAllOrders,
    confirmOrder,
    markOrderReady
};