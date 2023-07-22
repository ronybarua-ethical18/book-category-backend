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
const books_model_1 = require("./books.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const users_model_1 = require("../users/users.model");
const createBook = (requestPayload, bookPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.create(Object.assign(Object.assign({}, bookPayload), { user: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId }));
    return book;
});
const getAllBooks = (filters, requestQueries) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize the queries object
    const queries = {};
    const regex = new RegExp(requestQueries.text, "i");
    if (requestQueries.text) {
        queries.$or = [
            { title: regex },
            { genre: regex },
            { author: regex },
            { publication_date: regex },
        ];
    }
    console.log('modified queries', queries);
    // Add other filter conditions as needed
    // For example, if you have filters like "author", "genre", etc., you can add them similarly
    // Uncomment the following lines if you have additional filters in the "filters" object:
    // if (filters.author) {
    //   queries.author = filters.author;
    // }
    // if (filters.genre) {
    //   queries.genre = filters.genre;
    // }
    // ...
    // Use the constructed queries to find books in the database
    const books = yield books_model_1.Book.find(queries);
    return books;
});
const getSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findOne({ _id: bookId });
    if (!book) {
        throw new ApiError_1.default(404, 'Book not found');
    }
    return book;
});
const updateBook = (bookId, requestPayload, updatePayload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findOne({ _id: bookId, user: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId });
    if (!book) {
        throw new ApiError_1.default(404, 'Only book owner can update the book details');
    }
    const updateBook = yield books_model_1.Book.findByIdAndUpdate({ _id: bookId }, Object.assign({}, updatePayload), { new: true });
    return updateBook;
});
const deleteBook = (bookId, requestPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findOne({ _id: bookId, user: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId });
    if (!book) {
        throw new ApiError_1.default(404, 'Only book owner can delete the book');
    }
    const bookDelete = yield books_model_1.Book.findByIdAndDelete({ _id: bookId });
    return bookDelete;
});
const addReview = (requestPayload, commentWithBookId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Book.findOne({
        _id: bookId,
    });
    const user = yield users_model_1.User.findOne({ _id: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId });
    if (!book) {
        throw new ApiError_1.default(404, 'Book not found');
    }
    const review = {
        user: (user === null || user === void 0 ? void 0 : user.name.firstName) + ' ' + (user === null || user === void 0 ? void 0 : user.name.lastName),
        comment: commentWithBookId === null || commentWithBookId === void 0 ? void 0 : commentWithBookId.comment,
    };
    book.reviews.push(review);
    yield book.save();
    return book;
});
exports.default = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    addReview,
};
