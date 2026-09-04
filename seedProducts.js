const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./tongco-server/config/db");
const Category = require("./tongco-server/models/Category");
const Supplier = require("./tongco-server/models/Supplier");
const Product = require("./tongco-server/models/Product");

dotenv.config();

const products = [
    {
        name: "Nike Compression Shirt",
        description:
            "Nike compression shirt made from recycled polyester, designed for superior performance and sustainability.",
        price: 299,
        stock: 20,
        category: "Nike"
    },
    {
        name: "Nike Running Shoes",
        description:
            "Nike running shoes crafted with eco-friendly materials, featuring a breathable upper made from recycled mesh and a durable sole composed of sustainable rubber.",
        price: 199,
        stock: 20,
        category: "Nike"
    },
    {
        name: "Nike Socks",
        description:
            "Nike socks designed with sustainability in mind, featuring a moisture-wicking fabric and a comfortable fit for all-day wear.",
        price: 149,
        stock: 20,
        category: "Nike"
    },
    {
        name: "Adidas T-shirt",
        description:
            "Adidas t-shirt made from recycled polyester, designed for comfort and sustainability.",
        price: 299,
        stock: 20,
        category: "Adidas"
    },
    {
        name: "Adidas Hoodie",
        description:
            "Adidas hoodie made from recycled polyester, designed for comfort and sustainability.",
        price: 399,
        stock: 20,
        category: "Adidas"
    },
    {
        name: "Adidas Socks",
        description:
            "Adidas socks designed with sustainability in mind, featuring a moisture-wicking fabric and a comfortable fit for all-day wear.",
        price: 149,
        stock: 20,
        category: "Adidas"
    },
    {
        name: "Puma Sports Cap",
        description:
            "Puma sports cap made from recycled materials, designed for sun protection and sustainability.",
        price: 199,
        stock: 20,
        category: "Puma"
    },
    {
        name: "Puma Socks",
        description:
            "Puma socks designed with sustainability in mind, featuring a moisture-wicking fabric and a comfortable fit for all-day wear.",
        price: 149,
        stock: 20,
        category: "Puma"
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        let supplier = await Supplier.findOne({
            name: "Rushline Supplier"
        });

        if (!supplier) {
            supplier = await Supplier.create({
                name: "Rushline Supplier",
                contactPerson: "Rushline Admin",
                email: "rushline@gmail.com",
                phone: "09123456789",
                address: "Manila, Philippines"
            });
        }

        for (const item of products) {
            let category = await Category.findOne({
                name: item.category
            });

            if (!category) {
                category = await Category.create({
                    name: item.category,
                    description: `${item.category} products`
                });
            }

            const existingProduct = await Product.findOne({
                name: item.name
            });

            if (!existingProduct) {
                await Product.create({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    category: category._id,
                    supplier: supplier._id,
                    stock: item.stock,
                    image: "",
                    isActive: true
                });

                console.log(`${item.name} added`);
            } else {
                console.log(`${item.name} already exists`);
            }
        }

        console.log("Original products added successfully");
        process.exit();

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

seedProducts();