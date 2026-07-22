const Case = require("../models/Case");

// ======================================
// Create Case
// ======================================
const createCase = async (req, res) => {

    try {

        const {
            caseNumber,
            caseTitle,
            description,
            crimeType,
            policeOfficer
        } = req.body;

        if (
            !caseNumber ||
            !caseTitle ||
            !description ||
            !crimeType
        ) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        const existingCase = await Case.findOne({ caseNumber });

        if (existingCase) {
            return res.status(400).json({
                message: "Case Number already exists."
            });
        }

        const newCase = await Case.create({
            caseNumber,
            caseTitle,
            description,
            crimeType,
            policeOfficer,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Case created successfully.",
            case: newCase
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ======================================
// Get All Cases
// ======================================
const getAllCases = async (req, res) => {

    try {

        const cases = await Case.find()
            .populate("createdBy", "employeeId name role")
            .populate("policeOfficer", "employeeId name role");

        res.status(200).json({
            count: cases.length,
            cases
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ======================================
// Get Case By ID
// ======================================
const getCaseById = async (req, res) => {

    try {

        const singleCase = await Case.findById(req.params.id)
            .populate("createdBy", "employeeId name role")
            .populate("policeOfficer", "employeeId name role");

        if (!singleCase) {
            return res.status(404).json({
                message: "Case not found."
            });
        }

        res.status(200).json(singleCase);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ======================================
// Update Case
// ======================================
const updateCase = async (req, res) => {

    try {

        const singleCase = await Case.findById(req.params.id);

        if (!singleCase) {
            return res.status(404).json({
                message: "Case not found."
            });
        }

        const {
            caseTitle,
            description,
            crimeType,
            status,
            policeOfficer
        } = req.body;

        if (caseTitle) singleCase.caseTitle = caseTitle;
        if (description) singleCase.description = description;
        if (crimeType) singleCase.crimeType = crimeType;
        if (status) singleCase.status = status;
        if (policeOfficer) singleCase.policeOfficer = policeOfficer;

        await singleCase.save();

        res.status(200).json({
            message: "Case updated successfully.",
            case: singleCase
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ======================================
// Delete Case
// ======================================
const deleteCase = async (req, res) => {

    try {

        const singleCase = await Case.findById(req.params.id);

        if (!singleCase) {
            return res.status(404).json({
                message: "Case not found."
            });
        }

        await Case.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Case deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createCase,
    getAllCases,
    getCaseById,
    updateCase,
    deleteCase
};