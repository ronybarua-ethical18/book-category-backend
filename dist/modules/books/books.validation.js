"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        genre: zod_1.z.string({ required_error: 'Genre is required' }),
        publication_date: zod_1.z.string({
            required_error: 'Publication date is required',
        }),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
};
