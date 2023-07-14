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
const cows_service_1 = __importDefault(require("./cows.service"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const mongoose_1 = __importDefault(require("mongoose"));
const pick_1 = __importDefault(require("../../utils/pick"));
const paginationFields_1 = require("../../constants/paginationFields");
const cows_constants_1 = require("./cows.constants");
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    const cow = yield cows_service_1.default.createCow(Object.assign(Object.assign({}, req.body), { seller: new mongoose_1.default.Types.ObjectId(requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId) }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow created successfully',
        data: cow,
    });
}));
const getAllCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterableFields = (0, pick_1.default)(req.query, cows_constants_1.cowsFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const cows = yield cows_service_1.default.getAllCows(filterableFields, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `All cow fetched successfully`,
        meta: cows.meta,
        data: cows.data,
    });
}));
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.params.id === 'string') {
        const cow = yield cows_service_1.default.getSingleCow(new mongoose_1.default.Types.ObjectId(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Cow fetched successfully`,
            data: cow,
        });
    }
}));
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    if (typeof req.params.id === 'string') {
        const cow = yield cows_service_1.default.updateCow(new mongoose_1.default.Types.ObjectId(req.params.id), requestPayload, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Cow updated successfully`,
            data: cow,
        });
    }
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.params.id === 'string') {
        const cow = yield cows_service_1.default.deleteCow(new mongoose_1.default.Types.ObjectId(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Cow deleted successfully`,
            data: cow,
        });
    }
}));
exports.default = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
