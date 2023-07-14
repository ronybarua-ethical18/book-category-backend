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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.findLastAdminId = exports.generateUserId = exports.findLastUserId = void 0;
const admin_model_1 = require("../admin/admin.model");
const users_model_1 = require("./users.model");
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield users_model_1.User.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
});
exports.findLastUserId = findLastUserId;
const generateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastUserId)()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let normalize_id = currentId;
    if (currentId.includes('S') || currentId.includes('B')) {
        normalize_id = currentId.split('-')[1];
    }
    const incrementId = (parseInt(normalize_id) + 1).toString().padStart(5, '0');
    return incrementId;
});
exports.generateUserId = generateUserId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield admin_model_1.Admin.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let normalize_id = currentId;
    if (currentId.includes('A')) {
        normalize_id = currentId.split('-')[1];
    }
    const incrementId = (parseInt(normalize_id) + 1).toString().padStart(5, '0');
    return incrementId;
});
exports.generateAdminId = generateAdminId;
