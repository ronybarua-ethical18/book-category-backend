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
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const orders_service_1 = __importDefault(require("./orders.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cowId = req.body.cow;
    console.log('buyer id', req.user);
    const buyerId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) || null;
    if (typeof cowId === 'string' && typeof buyerId === 'string') {
        const order = yield orders_service_1.default.createOrder(new mongoose_1.default.Types.ObjectId(cowId), new mongoose_1.default.Types.ObjectId(buyerId));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order created successfully',
            data: order,
        });
    }
}));
const getAnOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    if (typeof req.params.id === 'string') {
        const order = yield orders_service_1.default.getAnOrder(requestPayload, new mongoose_1.default.Types.ObjectId(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Order fetched successfully`,
            data: order,
        });
    }
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req === null || req === void 0 ? void 0 : req.user;
    const allOrders = yield orders_service_1.default.getAllOrders(requestPayload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All orders fetched successfully',
        data: allOrders,
    });
}));
exports.default = {
    createOrder,
    getAnOrder,
    getAllOrders,
};
