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
const mongoose_1 = __importDefault(require("mongoose"));
const orders_model_1 = require("./orders.model");
const cows_model_1 = require("../cows/cows.model");
const users_model_1 = require("../users/users.model");
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cow = yield cows_model_1.Cow.findOne({ _id: cowId })
            .populate('seller')
            .session(session);
        const buyer = yield users_model_1.User.findOne({ _id: buyerId }).session(session);
        const buyerBudget = (buyer === null || buyer === void 0 ? void 0 : buyer.budget) || 0;
        if (!cow || !buyer) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow or buyer not found');
        }
        if (cow.price > buyerBudget) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer does not have enough money for buying the cow');
        }
        if (cow.price <= buyerBudget) {
            yield users_model_1.User.findByIdAndUpdate({ _id: (_a = cow === null || cow === void 0 ? void 0 : cow.seller) === null || _a === void 0 ? void 0 : _a._id }, { income: cow.price }, { new: true, session });
            const remainingBalance = buyerBudget - cow.price;
            yield users_model_1.User.findByIdAndUpdate({ _id: buyerId }, { budget: remainingBalance }, { new: true, session });
            yield cows_model_1.Cow.findByIdAndUpdate({ _id: cowId }, { label: 'sold_out' }, { new: true, session });
            const order = new orders_model_1.Order({
                cow: cowId,
                buyer: buyerId,
                seller: cow === null || cow === void 0 ? void 0 : cow.seller,
            });
            yield order.save({ session });
            yield session.commitTransaction();
            return order;
        }
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getAnOrder = (requestPayload, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const queries = {
        _id: orderId,
    };
    if ((requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role) === 'buyer') {
        queries.buyer = requestPayload.userId;
    }
    if ((requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role) === 'seller') {
        queries.seller = requestPayload.userId;
    }
    const order = yield orders_model_1.Order.findOne(queries)
        .populate('buyer')
        .populate('cow')
        .populate('seller');
    if (order) {
        return order;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
});
const getAllOrders = (requestPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const queries = {};
    if ((requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role) === 'buyer') {
        queries.buyer = requestPayload.userId;
    }
    if ((requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.role) === 'seller') {
        queries.seller = requestPayload.userId;
    }
    const orders = yield orders_model_1.Order.find(queries)
        .populate('buyer')
        .populate('cow')
        .populate('seller');
    return orders;
});
exports.default = {
    createOrder,
    getAnOrder,
    getAllOrders,
};
