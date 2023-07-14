"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const users_utils_1 = require("../users/users.utils");
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// create new user
const createAdmin = (adminPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, users_utils_1.generateAdminId)();
    const admin = yield admin_model_1.Admin.isAdminExist(adminPayload.phoneNumber);
    if (admin) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'The admin is already exist with the phone number');
    }
    else if ((adminPayload === null || adminPayload === void 0 ? void 0 : adminPayload.role) === 'admin') {
        adminPayload.id = `A-${id}`;
        const createAdmin = admin_model_1.Admin.create(adminPayload);
        return createAdmin;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not admin');
    }
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const admin = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!admin) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    if (admin.password &&
        !(yield admin_model_1.Admin.isPasswordMatched(password, admin.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id: userId, role } = admin;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
// get a single user
const getMyProfile = (requestPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findById({
        _id: new mongoose_1.default.Types.ObjectId(requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId),
        role: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role,
    });
    if (admin) {
        return admin;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
});
// update profile
const updateMyProfile = (requestPayload, updatePayload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findById({
        _id: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId,
        role: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role,
    });
    if (updatePayload.password) {
        const hashedPassword = yield bcrypt_1.default.hash(updatePayload.password, Number(config_1.default.bcrypt_salt_rounds));
        updatePayload.password = hashedPassword;
    }
    if (admin) {
        const updateAdmin = yield admin_model_1.Admin.findByIdAndUpdate({ _id: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId }, Object.assign({}, updatePayload), { new: true });
        return updateAdmin;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
});
exports.default = {
    createAdmin,
    loginAdmin,
    getMyProfile,
    updateMyProfile,
};
