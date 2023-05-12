const adminRouter = require('express').Router();

const { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, currentlyLoggedInAdmin , getAllSectionAdmins} = require('../controllers/admin_controller');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

adminRouter.post('/createAdmin', isAuthenticatedUser, authorizeRoles("admin"), createAdmin);

adminRouter.get('/getAllAdmins', isAuthenticatedUser, authorizeRoles("admin"), getAllAdmins);

adminRouter.get('/getAdminById/:id', isAuthenticatedUser, authorizeRoles("admin"), getAdminById);

adminRouter.put('/updateAdmin/:id', isAuthenticatedUser, authorizeRoles("admin"), updateAdmin);

adminRouter.delete('/deleteAdmin/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteAdmin);

adminRouter.post("/loginAdmin", loginAdmin);

adminRouter.get("/logoutAdmin", isAuthenticatedUser, authorizeRoles("admin"), logoutAdmin);

adminRouter.get("/currentAdmin", isAuthenticatedUser, authorizeRoles("admin"), currentlyLoggedInAdmin);

adminRouter.get("/getAllSectionAdmins", isAuthenticatedUser, authorizeRoles("admin"), getAllSectionAdmins);

adminRouter.get("/logoutSectionAdmin", isAuthenticatedUser, authorizeRoles("section-admin"), logoutAdmin);

adminRouter.get("/currentSectionAdmin", isAuthenticatedUser, authorizeRoles("section-admin"), currentlyLoggedInAdmin);

module.exports = adminRouter;
