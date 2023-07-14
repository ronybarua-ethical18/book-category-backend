"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string({
            required_error: 'role is required',
        }),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string({ required_error: 'phoneNumber is required' }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'lastName is required',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
    }),
});
///  Ensure 1: Route Level : Update -->  Give me title and code both , neither
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
