const complaintRouter = require('express').Router();

const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint } = require("../controllers/complaint_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require('../middleware/upload');

complaintRouter.post('/createComplaint',isAuthenticatedUser,authorizeRoles("admin","section-admin"),upload.single("attachment"), createComplaint);

complaintRouter.get('/getAllComplaints',isAuthenticatedUser,authorizeRoles("admin","section-admin"), getAllComplaints);

complaintRouter.get('/getComplaintById/:id',isAuthenticatedUser,authorizeRoles("admin","section-admin"), getComplaintById);

complaintRouter.put('/updateComplaint/:id',isAuthenticatedUser,authorizeRoles("admin","section-admin"),upload.single("attachment"), updateComplaint);

complaintRouter.delete('/deleteComplaint/:id',isAuthenticatedUser,authorizeRoles("admin"), deleteComplaint);

module.exports = complaintRouter