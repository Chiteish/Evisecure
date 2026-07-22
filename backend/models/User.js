const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    employeeId: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Admin", "Police", "Judge", "Forensic"],
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);