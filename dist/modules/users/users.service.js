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
// import config from '../../config'
// import config from '../../config'
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = require("./users.model");
const users_utils_1 = require("./users.utils");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = __importDefault(require("../../utils/pagination"));
const config_1 = __importDefault(require("../../config"));
// create new user
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield users_model_1.User.isUserExist(user.phoneNumber);
    if (!isExist) {
        const id = yield (0, users_utils_1.generateUserId)();
        if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer') {
            user.id = `B-${id}`;
        }
        if ((user === null || user === void 0 ? void 0 : user.role) === 'seller') {
            user.id = `S-${id}`;
        }
        const createdUser = yield users_model_1.User.create(user);
        if (!createUser) {
            throw new Error('Failed to create user!');
        }
        return createdUser;
    }
    else {
        throw new ApiError_1.default(403, 'User already exist with the number');
    }
});
// get all users from db
const getAllUsers = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const users = yield users_model_1.User.find({})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit || 10);
    const total = yield users_model_1.User.countDocuments();
    const meta = { page, limit, total };
    return {
        meta: meta,
        data: users || [],
    };
});
// get a single user
const getMyProfile = (requestPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById({
        _id: new mongoose_1.default.Types.ObjectId(requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId),
        role: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role,
    });
    if (user) {
        return user;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
});
// update profile
const updateMyProfile = (requestPayload, updatePayload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById({
        _id: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId,
        role: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role,
    });
    if (updatePayload.password) {
        const hashedPassword = yield bcrypt_1.default.hash(updatePayload.password, Number(config_1.default.bcrypt_salt_rounds));
        updatePayload.password = hashedPassword;
    }
    if (user) {
        const updateUser = yield users_model_1.User.findByIdAndUpdate({ _id: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId }, Object.assign({}, updatePayload), { new: true });
        return updateUser;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
});
// get a single user
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById({ _id: userId });
    if (user) {
        return user;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
});
// update a single user
const updateUser = (userId, updatePayload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById({ _id: userId });
    if (user) {
        const updateUser = yield users_model_1.User.findByIdAndUpdate({ _id: userId }, Object.assign({}, updatePayload), { new: true });
        return updateUser;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
});
// delete a single user
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById({ _id: userId });
    if (user) {
        const deletedUser = yield users_model_1.User.findByIdAndDelete({ _id: userId });
        return deletedUser;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
});
exports.default = {
    createUser,
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
