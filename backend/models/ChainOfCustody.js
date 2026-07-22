// 
const mongoose = require("mongoose");

const chainOfCustodySchema = new mongoose.Schema(
{
    evidenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evidence",
        required: true
    },

    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    action: {
        type: String,
        enum: [
            "UPLOAD",
            "VIEW",
            "DOWNLOAD",
            "UPDATE",
            "VERIFY",
            "DELETE",
            "RESTORE"
        ],
        required: true
    },

    description: {
        type: String
    },

    ipAddress: {
        type: String
    },

    userAgent: {
        type: String
    },

    status: {
        type: String,
        enum: ["SUCCESS", "FAILED"],
        default: "SUCCESS"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "ChainOfCustody",
    chainOfCustodySchema
);