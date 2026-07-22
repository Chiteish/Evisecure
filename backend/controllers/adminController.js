const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ======================================
// Create New Employee (Admin Only)
// ======================================
const createUser = async (req, res) => {
    try {
        const {
            employeeId,
            name,
            email,
            password,
            role
        } = req.body;

        // Check required fields
        if (
            !employeeId ||
            !name ||
            !email ||
            !password ||
            !role
        ) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }

        // Check if Employee ID already exists
        const employeeExists = await User.findOne({ employeeId });

        if (employeeExists) {
            return res.status(400).json({
                message: "Employee ID already exists."
            });
        }

        // Check if Email already exists
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            employeeId,
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User created successfully.",
            user: {
                id: user._id,
                employeeId: user.employeeId,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};
const getAllUsers = async (req, res) => {

    console.log("✅ getAllUsers API called");

    try {

        const users = await User.find().select("-password");

        console.log(users);

        res.status(200).json({
            count: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            employeeId,
            name,
            email,
            role
        } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Check Employee ID duplication
        if (employeeId && employeeId !== user.employeeId) {

            const employeeExists = await User.findOne({ employeeId });

            if (employeeExists) {
                return res.status(400).json({
                    message: "Employee ID already exists."
                });
            }

            user.employeeId = employeeId;
        }

        // Check Email duplication
        if (email && email !== user.email) {

            const emailExists = await User.findOne({ email });

            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }

            user.email = email;
        }

        if (name) user.name = name;
        if (role) user.role = role;

        await user.save();

        res.status(200).json({
            message: "User updated successfully.",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Prevent deleting the last Admin (optional but recommended)
        if (user.role === "Admin") {

            const adminCount = await User.countDocuments({
                role: "Admin"
            });

            if (adminCount === 1) {
                return res.status(400).json({
                    message: "Cannot delete the last Admin."
                });
            }
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};