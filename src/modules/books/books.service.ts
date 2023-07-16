import { IBook, IBookSearchFields, IReview } from './books.interface'
import { JwtPayload } from 'jsonwebtoken'
import { Book } from './books.model'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'
import { User } from '../users/users.model'

const createBook = async (
  requestPayload: JwtPayload | null,
  bookPayload: IBook
): Promise<IBook> => {
  const book = await Book.create({
    ...bookPayload,
    user: requestPayload?.userId,
  })
  return book
}

const getAllBooks = async (filters: IBookSearchFields): Promise<IBook[]> => {
  const andConditions = []

  console.log('filters', filters)

  if (filters) {
    const filterConditions = Object.keys(filters).map(field => ({
      [field]: {
        $regex: new RegExp(filters[field], 'i'), // Use the filter value instead of the field name
      },
    }))

    if (filterConditions.length > 0) {
      andConditions.push(...filterConditions) // Spread the filter conditions into andConditions array
    }
  }

  const conditions = andConditions.length > 0 ? { $and: andConditions } : {}

  console.log('conditions', conditions)
  const books = await Book.find(conditions)
  return books
}

const getSingleBook = async (
  bookId: mongoose.Types.ObjectId,
  requestPayload: JwtPayload | null
): Promise<IBook> => {
  const book = await Book.findOne({ _id: bookId, user: requestPayload?.userId })

  if (!book) {
    throw new ApiError(404, 'Book not found')
  }
  return book
}

const updateBook = async (
  bookId: mongoose.Types.ObjectId,
  requestPayload: JwtPayload | null,
  updatePayload: IBook
): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: bookId, user: requestPayload?.userId })

  if (!book) {
    throw new ApiError(404, 'Book not found')
  }

  const updateBook = await Book.findByIdAndUpdate(
    { _id: bookId },
    { ...updatePayload },
    { new: true }
  )
  return updateBook
}

const deleteBook = async (
  bookId: mongoose.Types.ObjectId,
  requestPayload: JwtPayload | null
): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: bookId, user: requestPayload?.userId })

  if (!book) {
    throw new ApiError(404, 'Book not found')
  }

  const bookDelete = await Book.findByIdAndDelete({ _id: bookId })
  return bookDelete
}

const addReview = async (
  requestPayload: JwtPayload | null,
  commentWithBookId: IReview,
  bookId:mongoose.Types.ObjectId
): Promise<IBook> => {
  const book = await Book.findOne({
    _id: bookId,
  })

  const user = await User.findOne({ _id: requestPayload?.userId })

  if (!book) {
    throw new ApiError(404, 'Book not found')
  }

  const review = {
    user: user?.name.firstName + ' ' + user?.name.lastName,
    comment: commentWithBookId?.comment,
  }

  book.reviews.push(review)
  await book.save()

  return book
}

export default {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReview,
}
