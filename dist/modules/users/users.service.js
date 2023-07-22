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
const users_model_1 = require("./users.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
// get a single user
const addBookToWishList = (bookId, requestPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId;
    const user = yield users_model_1.User.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const wishlist = user.wishlist;
    const bookIndex = wishlist.findIndex(item => item.bookId.equals(bookId));
    if (bookIndex !== -1) {
        wishlist.splice(bookIndex, 1); // Pop the existing bookId from wishlist array
    }
    else {
        wishlist.push({ bookId: bookId }); // Push the new bookId to wishlist array
    }
    user.wishlist = wishlist;
    yield user.save();
    return user;
});
const getBooksFromWishlist = (requestPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ _id: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId }).populate('wishlist.bookId');
    if (!user) {
        throw new ApiError_1.default(404, 'user not found');
    }
    return user;
});
exports.default = {
    addBookToWishList,
    getBooksFromWishlist,
};
