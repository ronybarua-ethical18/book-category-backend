import { Request, Response } from 'express'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { ILoginUserResponse } from '../auth/auth.interface'
import { AuthService } from './auth.service'
import { IUser } from '../users/users.interface'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  })
})

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { ...signUpData } = req.body
  const result = await AuthService.signup(signUpData)

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User Sign up is successfully !',
    data: result,
  })
})

export default {
  loginUser,
  signUp,
}
