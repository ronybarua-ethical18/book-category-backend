import { z } from 'zod'

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const signUpZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
})

export const AuthValidation = {
  loginZodSchema,
  signUpZodSchema,
}
