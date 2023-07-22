"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const books_controller_1 = __importDefault(require("./books.controller"));
const books_validation_1 = require("./books.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(books_validation_1.BookValidation.createBookZodSchema), (0, auth_1.default)(), books_controller_1.default.createBook);
router.get('/', books_controller_1.default.getAllBooks);
router.get('/:id', books_controller_1.default.getSingleBook);
router.put('/:id', (0, auth_1.default)(), books_controller_1.default.updateBook);
router.delete('/:id', (0, auth_1.default)(), books_controller_1.default.deleteBook);
router.patch('/reviews/:id', (0, auth_1.default)(), books_controller_1.default.addReview);
exports.default = router;
