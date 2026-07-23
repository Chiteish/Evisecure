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
// Get All Evidence
const getAllEvidence = async (req, res) => {

    try {

        const evidence = await Evidence.find({ isDeleted: false })

            .populate("caseId", "caseNumber caseTitle")

            .populate("uploadedBy", "employeeId name role")

            .sort({ createdAt: -1 });

        res.status(200).json({

            count: evidence.length,

            evidence

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};
// Get Evidence By ID
const getEvidenceById = async (req, res) => {

    try {

        const { id } = req.params;

        const evidence = await Evidence.findById(id)

            .populate("caseId", "caseNumber caseTitle")

            .populate("uploadedBy", "employeeId name role");

        if (!evidence || evidence.isDeleted) {

            return res.status(404).json({

                message: "Evidence not found."

            });

        }

        res.status(200).json(evidence);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};
// Download Evidence

const downloadEvidence = async (req, res) => {

    try {

        const evidence = await Evidence.findOne({

            _id: req.params.id,

            isDeleted: false

        });

        if (!evidence) {

            return res.status(404).json({

                message: "Evidence not found."

            });

        }

        // Save Chain of Custody Log

        await ChainOfCustody.create({

            evidenceId: evidence._id,

            caseId: evidence.caseId,

            userId: req.user.id,

            action: "DOWNLOAD",

            description: "Evidence downloaded.",

            ipAddress: req.ip,

            userAgent: req.headers["user-agent"]

        });
        if (!fs.existsSync(evidence.filePath)) {

    return res.status(404).json({
        message: "Evidence file not found."
    });

}
        // Download File

        return res.download(

            evidence.filePath,

            evidence.originalFileName

        );

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};
// Verify Evidence Integrity

const verifyEvidence = async (req, res) => {

    try {

        const evidence = await Evidence.findOne({

            _id: req.params.id,

            isDeleted: false

        });

        if (!evidence) {

            return res.status(404).json({

                message: "Evidence not found."

            });

        }

        // Read File

        if (!fs.existsSync(evidence.filePath)) {

            return res.status(404).json({
                message: "Evidence file not found."
            });

        }

        const fileBuffer = fs.readFileSync(

            evidence.filePath

        );

        // Generate Current Hash

        const currentHash = crypto

            .createHash("sha256")

            .update(fileBuffer)

            .digest("hex");

        const status =

            currentHash === evidence.sha256Hash

                ? "VALID"

                : "TAMPERED";

        // Save Chain Of Custody

        await ChainOfCustody.create({

            evidenceId: evidence._id,

            caseId: evidence.caseId,

            userId: req.user.id,

            action: "VERIFY",

            description: `Evidence verification completed. Status: ${status}`,

            ipAddress: req.ip,

            userAgent: req.headers["user-agent"]

        });

        res.status(200).json({

            evidenceNumber: evidence.evidenceNumber,

            originalHash: evidence.sha256Hash,

            currentHash,

            status

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};
// Update Evidence

const updateEvidence = async (req, res) => {

    try {

        const { description, remarks, status } = req.body;

        const evidence = await Evidence.findOne({

            _id: req.params.id,

            isDeleted: false

        });

        if (!evidence) {

            return res.status(404).json({

                message: "Evidence not found."

            });

        }

        if (description !== undefined)
            evidence.description = description;

        if (remarks !== undefined)
            evidence.remarks = remarks;

        if (status !== undefined)
            evidence.status = status;

        evidence.updatedBy = req.user.id;

        evidence.version += 1;

        await evidence.save();

        await ChainOfCustody.create({

            evidenceId: evidence._id,

            caseId: evidence.caseId,

            userId: req.user.id,

            action: "UPDATE",

            description: "Evidence metadata updated.",

            ipAddress: req.ip,

            userAgent: req.headers["user-agent"]

        });

        res.status(200).json({

            message: "Evidence updated successfully.",

            evidence

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};  
// Soft Delete Evidence

const deleteEvidence = async (req, res) => {

    try {

        const evidence = await Evidence.findOne({

            _id: req.params.id,

            isDeleted: false

        });

        if (!evidence) {

            return res.status(404).json({

                message: "Evidence not found."

            });

        }

        evidence.isDeleted = true;

        evidence.deletedBy = req.user.id;

        evidence.deletedAt = new Date();

        await evidence.save();

        await ChainOfCustody.create({

            evidenceId: evidence._id,

            caseId: evidence.caseId,

            userId: req.user.id,

            action: "DELETE",

            description: "Evidence soft deleted.",

            ipAddress: req.ip,

            userAgent: req.headers["user-agent"]

        });

        res.status(200).json({

            message: "Evidence deleted successfully."

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

};
// View Evidence

const viewEvidence = async (req, res) => {

    try {

        const evidence = await Evidence.findOne({

            _id:req.params.id,

            isDeleted:false

        });

        if(!evidence){

            return res.status(404).json({

                message:"Evidence not found."

            });

        }

        await ChainOfCustody.create({

            evidenceId:evidence._id,

            caseId:evidence.caseId,

            userId:req.user.id,

            action:"VIEW",

            description:"Evidence viewed.",

            ipAddress:req.ip,

            userAgent:req.headers["user-agent"]

        });

        res.status(200).json({

            evidence

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

};
// 
// Chain Of Custody Timeline

const getEvidenceHistory = async (req,res)=>{

    try{

        const history = await ChainOfCustody.find({

            evidenceId:req.params.id

        })

        .populate("userId","employeeId name role")

        .sort({

            createdAt:1

        });

        res.status(200).json({

            count:history.length,

            history

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    uploadEvidence,
    getAllEvidence,
    getEvidenceById,
    downloadEvidence,
    verifyEvidence,
    updateEvidence,
    deleteEvidence,
    viewEvidence,
    getEvidenceHistory

};