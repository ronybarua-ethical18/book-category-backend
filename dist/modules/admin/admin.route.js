"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = __importDefault(require("./admin.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const users_validation_1 = require("../users/users.validation");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.adminValidation.createAdminZodSchema), admin_controller_1.default.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.adminValidation.loginAdminZodSchema), admin_controller_1.default.loginAdmin);
router.get('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.default.getMyProfile);
router.patch('/my-profile', (0, validateRequest_1.default)(users_validation_1.UserValidation.updateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.default.updateMyProfile);
exports.default = router;
