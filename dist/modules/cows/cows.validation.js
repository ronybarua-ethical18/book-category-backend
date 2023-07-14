"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        price: zod_1.z.number({
            required_error: 'price is required',
        }),
        age: zod_1.z.number().optional(),
        location: zod_1.z.string({
            required_error: 'location is required',
        }),
        label: zod_1.z.string({ required_error: 'label is required' }),
        category: zod_1.z.string({ required_error: 'category is required' }),
        breed: zod_1.z.string({ required_error: 'breed is required' }),
        weight: zod_1.z.string({ required_error: 'weight is required' }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        age: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        label: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
