"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const handleZodError_1 = __importDefault(require("./handleZodError"));
const ApiError_1 = __importDefault(require("./ApiError"));
const config_1 = __importDefault(require("../config"));
// import { errorLogger } from '../shared/logger'
const globalErrorHandler = (error, _req, res, next) => {
    config_1.default.env === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
        : console.log(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const normalizeError = (0, handleValidationError_1.default)(error);
        statusCode = normalizeError === null || normalizeError === void 0 ? void 0 : normalizeError.statusCode;
        message = normalizeError.message;
        errorMessages = normalizeError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const normalizeError = (0, handleZodError_1.default)(error);
        statusCode = normalizeError === null || normalizeError === void 0 ? void 0 : normalizeError.statusCode;
        message = normalizeError.message;
        errorMessages = normalizeError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        ;
        (statusCode = error === null || error === void 0 ? void 0 : error.statusCode),
            (message = error === null || error === void 0 ? void 0 : error.message),
            (errorMessages = (error === null || error === void 0 ? void 0 : error.message)
                ? [
                    {
                        path: '',
                        message: error === null || error === void 0 ? void 0 : error.message,
                    },
                ]
                : []);
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).send({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
