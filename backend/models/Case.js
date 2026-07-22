// 
const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
{
    caseNumber: {
        type: String,
        required: true,
        unique: true
    },

    caseTitle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    crimeType: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Open",
            "Under Investigation",
            "Closed"
        ],
        default: "Open"
    },

    policeOfficer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Case", caseSchema);