const User = require("../models/User");
const Case = require("../models/Case");
const Evidence = require("../models/Evidence");
const ChainOfCustody = require("../models/ChainOfCustody");


// ==========================================
// Dashboard Summary
// ==========================================

const getDashboardSummary = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalCases = await Case.countDocuments();

        const totalEvidence = await Evidence.countDocuments({
            isDeleted: false
        });

        const totalDeletedEvidence = await Evidence.countDocuments({
            isDeleted: true
        });

        const activeCases = await Case.countDocuments({
            status: "Active"
        });

        res.status(200).json({

            totalUsers,

            totalCases,

            totalEvidence,

            totalDeletedEvidence,

            activeCases

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// Evidence Status Statistics
// ==========================================

const getEvidenceStatus = async (req, res) => {

    try {

        const uploaded = await Evidence.countDocuments({
            status: "Uploaded",
            isDeleted: false
        });

        const verified = await Evidence.countDocuments({
            status: "Verified",
            isDeleted: false
        });

        const underReview = await Evidence.countDocuments({
            status: "Under Review",
            isDeleted: false
        });

        const archived = await Evidence.countDocuments({
            status: "Archived",
            isDeleted: false
        });

        res.status(200).json({

            Uploaded: uploaded,

            Verified: verified,

            "Under Review": underReview,

            Archived: archived

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// Recent Evidence
// ==========================================

const getRecentEvidence = async (req, res) => {

    try {

        const evidence = await Evidence.find({

            isDeleted: false

        })

        .populate("uploadedBy", "employeeId name role")

        .populate("caseId", "caseNumber caseTitle")

        .sort({

            createdAt: -1

        })

        .limit(5);

        res.status(200).json({

            count: evidence.length,

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


// ==========================================
// Recent Activities
// ==========================================

const getRecentActivities = async (req, res) => {

    try {

        const activities = await ChainOfCustody.find()

        .populate("userId", "employeeId name role")

        .populate("evidenceId", "evidenceNumber evidenceName")

        .sort({

            createdAt: -1

        })

        .limit(10);

        res.status(200).json({

            count: activities.length,

            activities

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports = {

    getDashboardSummary,

    getEvidenceStatus,

    getRecentEvidence,

    getRecentActivities

};