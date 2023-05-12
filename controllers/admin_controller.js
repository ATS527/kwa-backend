const Admin = require("../models/user");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const sendToken = require("../utils/jwtToken");

exports.createAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;

    const checkAdmin = await Admin.findOne({
        where: {
            email: email
        }
    });

    if (checkAdmin) {
        return res.status(400).json({
            success: false,
            message: "Admin already exists",
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const admin = await Admin.create({
            id: nanoid(),
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            success: true,
            admin
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            where: {
                role: "admin"
            }
        });

        res.status(200).json({
            success: true,
            admins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllSectionAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            where: {
                role: "section-admin"
            }
        });

        res.status(200).json({
            success: true,
            admins
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findOne({
            where: {
                id
            }
        });

        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const admin = await Admin.update({
            name,
            email,
            hashedPassword,
            role,
        }, {
            where: {
                id
            }
        });

        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {

        const admin = await Admin.findOne({
            where: {
                id: id
            }
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        await Admin.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            success: true,
            message: "Deleted admin successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({
            where: {
                email
            }
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        const isPasswordMatch = bcrypt.compareSync(password, admin.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        sendToken(admin, 201, res);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.logoutAdmin = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.currentlyLoggedInAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                id: req.user.id
            }
        });

        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
