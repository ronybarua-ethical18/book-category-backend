"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string().refine(value => {
            return /^[0-9a-fA-F]{24}$/.test(value);
        }, 'Invalid ObjectId'),
        // buyer: z.string().refine(value => {
        //   return /^[0-9a-fA-F]{24}$/.test(value)
        // }, 'Invalid ObjectId'),
    }),
});
exports.orderValidations = {
    createOrderZodSchema,
};
