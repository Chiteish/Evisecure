// 
const fs = require("fs");
const crypto = require("crypto");

const Case = require("../models/Case");
const Evidence = require("../models/Evidence");
const ChainOfCustody = require("../models/ChainOfCustody");

// Upload Evidence
const uploadEvidence = async (req, res) => {

    try {

        const { caseId } = req.params;

        const { evidenceName, description, remarks } = req.body;
        console.log("========== BODY ==========");
console.log(req.body);

console.log("Evidence Name:", evidenceName);

console.log("========== FILE ==========");
console.log(req.file);

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a file."
            });

        }

        // Check Case
        const caseExists = await Case.findById(caseId);

        if (!caseExists) {

            return res.status(404).json({
                message: "Case not found."
            });

        }

        // Generate SHA-256 Hash
        const fileBuffer = fs.readFileSync(req.file.path);

        const hash = crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");

        // Generate Evidence Number
        const count = await Evidence.countDocuments();

        const evidenceNumber =
            "EVD" + String(count + 1).padStart(4, "0");

        // Save Evidence
        const evidence = await Evidence.create({

            caseId,

            evidenceNumber,

            evidenceName,

            description,

            originalFileName: req.file.originalname,

            storedFileName: req.file.filename,

            filePath: req.file.path,

            fileType: req.file.mimetype.split("/")[0],

            mimeType: req.file.mimetype,

            fileSize: req.file.size,

            sha256Hash: hash,

            uploadedBy: req.user.id,

            remarks

        });

        // Save Chain Of Custody

        await ChainOfCustody.create({

            evidenceId: evidence._id,

            caseId,

            userId: req.user.id,

            action: "UPLOAD",

            description: "Evidence uploaded.",

            ipAddress: req.ip,

            userAgent: req.headers["user-agent"]

        });

        res.status(201).json({

            message: "Evidence uploaded successfully.",

            evidence

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {

    uploadEvidence

};