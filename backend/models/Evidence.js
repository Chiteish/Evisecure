// 
const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
{
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true
    },

    evidenceNumber: {
        type: String,
        required: true,
        unique: true
    },

    evidenceName: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    originalFileName: {
        type: String,
        required: true
    },

    storedFileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },

    fileType: {
        type: String,
        required: true
    },

    mimeType: {
        type: String,
        required: true
    },

    fileSize: {
        type: Number,
        required: true
    },

    sha256Hash: {
        type: String,
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    remarks: {
        type: String,
        default: ""
    },

    version: {
        type: Number,
        default: 1
    },

    status: {
        type: String,
        enum: [
            "Uploaded",
            "Verified",
            "Under Review",
            "Archived"
        ],
        default: "Uploaded"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    deletedAt: {
        type: Date
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Evidence", evidenceSchema);