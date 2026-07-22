const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const seedAdmin = async () => {

    try {

        await connectDB();

        // Check if an Admin already exists
        const adminExists = await User.findOne({ role: "Admin" });

        if (adminExists) {
            console.log("✅ Admin already exists.");
            process.exit();
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Admin@123", salt);

        // Create Admin
        await User.create({
            employeeId: "ADM001",
            name: "System Administrator",
            email: "admin@evidence.gov.in",
            password: hashedPassword,
            role: "Admin"
        });

        console.log("✅ Default Admin Created Successfully!");

        console.log("-----------------------------------");
        console.log("Employee ID : ADM001");
        console.log("Password    : Admin@123");
        console.log("-----------------------------------");

        process.exit();

    } catch (error) {

        console.error(error);
        process.exit(1);

    }

};

seedAdmin();