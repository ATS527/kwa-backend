const utilitiesRouter = require('express').Router();

const { leakageBenefits, feeDetails } = require("../controllers/utilities_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

utilitiesRouter.post('/leakageBenefits',isAuthenticatedUser,authorizeRoles("admin","section-admin"), leakageBenefits);

utilitiesRouter.post('/feeDetails',isAuthenticatedUser,authorizeRoles("admin","section-admin"), feeDetails);

module.exports = utilitiesRouter;