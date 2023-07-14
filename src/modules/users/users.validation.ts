import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
    phoneNumber: z.string({ required_error: 'phoneNumber is required' }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
    }),
    address: z.string({
      required_error: 'address is required',
    }),
  }),
})

///  Ensure 1: Route Level : Update -->  Give me title and code both , neither

const updateUserZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
