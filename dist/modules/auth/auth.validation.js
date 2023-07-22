"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'lastName is required',
            }),
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    signUpZodSchema,
};
