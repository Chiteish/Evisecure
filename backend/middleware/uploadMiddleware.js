const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        let uploadPath = "uploads/others";

        if (file.mimetype.startsWith("image/")) {
            uploadPath = "uploads/images";
        }
        else if (file.mimetype.startsWith("video/")) {
            uploadPath = "uploads/videos";
        }
        else if (file.mimetype.startsWith("audio/")) {
            uploadPath = "uploads/audios";
        }
        else if (
            file.mimetype === "application/pdf" ||
            file.mimetype.includes("document") ||
            file.mimetype.includes("msword")
        ) {
            uploadPath = "uploads/documents";
        }

        cb(null, uploadPath);

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// Allowed Files
const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/jpg",

        "video/mp4",

        "audio/mpeg",

        "application/pdf"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error("File type not supported."), false);

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 100 * 1024 * 1024
    }

});

module.exports = upload;