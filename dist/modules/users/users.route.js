"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("./users.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const users_validation_1 = require("./users.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.get('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), users_controller_1.default.getMyProfile);
router.patch('/my-profile', (0, validateRequest_1.default)(users_validation_1.UserValidation.updateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), users_controller_1.default.updateMyProfile);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.getAllUsers);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.getSingleUser);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(users_validation_1.UserValidation.updateUserZodSchema), users_controller_1.default.updateUser);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.deleteUser);
exports.default = router;
