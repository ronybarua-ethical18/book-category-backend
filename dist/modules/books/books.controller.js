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
const books_service_1 = __importDefault(require("./books.service"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
const pick_1 = __importDefault(require("../../utils/pick"));
const paginationFields_1 = require("../../constants/paginationFields");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    const book = yield books_service_1.default.createBook(requestPayload, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `New book is created successfully`,
        data: book,
    });
}));
const addReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    if (typeof req.params.id === 'string') {
        const book = yield books_service_1.default.addReview(requestPayload, req.body, new mongoose_1.default.Types.ObjectId(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Review is created successfully`,
            data: book,
        });
    }
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, paginationFields_1.booksFilterableFields);
    const book = yield books_service_1.default.getAllBooks(filters, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `All Books are fetched successfully`,
        data: book,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.params.id === 'string') {
        const book = yield books_service_1.default.getSingleBook(new mongoose_1.default.Types.ObjectId(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Single book is fetched successfully`,
            data: book,
        });
    }
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    if (typeof req.params.id === 'string') {
        const book = yield books_service_1.default.updateBook(new mongoose_1.default.Types.ObjectId(req.params.id), requestPayload, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Book is updated successfully`,
            data: book,
        });
    }
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestPayload = req.user;
    if (typeof req.params.id === 'string') {
        const book = yield books_service_1.default.deleteBook(new mongoose_1.default.Types.ObjectId(req.params.id), requestPayload);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Book is deleted successfully`,
            data: book,
        });
    }
}));
exports.default = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    addReview,
};
