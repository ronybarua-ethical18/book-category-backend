"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../users/users.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const users_validation_1 = require("../users/users.validation");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(users_validation_1.UserValidation.createUserZodSchema), users_controller_1.default.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.default.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.default.refreshToken);
exports.default = router;
