const { nanoid } = require("nanoid");
const Complaint = require("../models/complaint");
const fs = require("fs");

const server_url = process.env.SERVER_URL || "http://localhost:3000/uploads/";

exports.createComplaint = async (req, res) => {
    try {
        var data = {};
        if (req.file) {
            data = {
                id: nanoid(),
                attachment_path: server_url + req.file.filename,
                ...req.body
            }
        } else {
            data = {
                id: nanoid(),
                ...req.body
            }
        }

        const complaint = await Complaint.create(data);

        res.status(200).json({
            success: true,
            complaint
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getAllComplaints = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const complaints = await Complaint.findAll({
            limit,
            offset,
        });

        res.status(200).json({
            success: true,
            complaints
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findOne({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            complaint
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.updateComplaint = async (req, res) => {
    try {

        const complaint = await Complaint.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        var data = {};

        if (req.file) {
            const previousAttachmentPath = complaint.attachment_path.replace(server_url, "");
            fs.unlink("./public/uploads/" + previousAttachmentPath, async (err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    data = {
                        attachment_path: server_url + req.file.filename,
                        ...req.body
                    }

                    await Complaint.update(data, {
                        where: {
                            id: req.params.id
                        },
                    });

                    await complaint.reload();

                    res.status(200).json({
                        success: true,
                        complaint,
                    });
                }
            });
        } else {
            data = {
                ...req.body
            }

            await Complaint.update(data, {
                where: {
                    id: req.params.id
                },
            });

            await complaint.reload();

            res.status(200).json({
                success: true,
                complaint
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.deleteComplaint = async (req, res) => {
    try {

        const complaint = await Complaint.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        if (complaint.attachment_path) {
            const previousAttachmentPath = complaint.attachment_path.replace(server_url, "");
            fs.unlink("./public/uploads/" + previousAttachmentPath, async (err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    await complaint.destroy();

                    res.status(200).json({
                        success: true,
                        message: "Complaint deleted successfully"
                    });
                }
            });
        } else {
            await complaint.destroy();

            res.status(200).json({
                success: true,
                message: "Complaint deleted successfully"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}