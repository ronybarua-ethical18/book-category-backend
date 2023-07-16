import { Request, Response } from 'express'
import httpStatus from 'http-status'
import usersService from './users.service'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { IUser } from './users.interface'
import mongoose from 'mongoose'

const addBookToWishList = catchAsync(async (req: Request, res: Response) => {
  const requestPayload = req.user

  const user = await usersService.addBookToWishList(
    new mongoose.Types.ObjectId(req.body),
    requestPayload
  )
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book added successfully to wishlist`,
    data: user,
  })
})

export default {
  addBookToWishList,
}
