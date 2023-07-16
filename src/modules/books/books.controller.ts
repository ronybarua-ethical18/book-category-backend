import { Request, Response } from 'express'
import httpStatus from 'http-status'
import usersService from './books.service'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { IBook } from './books.interface'
import mongoose from 'mongoose'
import pick from '../../utils/pick'
import { booksFilterableFields } from '../../constants/paginationFields'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const requestPayload = req.user

  const book = await usersService.createBook(requestPayload, req.body)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `New book is created successfully`,
    data: book,
  })
})

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields)
  const book = await usersService.getAllBooks(filters)
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All Books are fetched successfully`,
    data: book,
  })
})

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const requestPayload = req.user
  if (typeof req.params.id === 'string') {
    const book = await usersService.getSingleBook(
      new mongoose.Types.ObjectId(req.params.id),
      requestPayload
    )
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Single book is fetched successfully`,
      data: book,
    })
  }
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const requestPayload = req.user
  if (typeof req.params.id === 'string') {
    const book = await usersService.updateBook(
      new mongoose.Types.ObjectId(req.params.id),
      requestPayload,
      req.body
    )
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Book is updated successfully`,
      data: book,
    })
  }
})

export default {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
}
