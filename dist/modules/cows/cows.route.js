"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cows_controller_1 = __importDefault(require("./cows.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cows_validation_1 = require("./cows.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(cows_validation_1.CowValidation.createCowZodSchema), cows_controller_1.default.createCow);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.default.getAllCows);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.default.getSingleCow);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(cows_validation_1.CowValidation.updateCowZodSchema), cows_controller_1.default.updateCow);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.default.deleteCow);
exports.default = router;
