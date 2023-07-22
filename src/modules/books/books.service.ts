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

const getAllBooks = async (filters: IBookSearchFields, requestQueries: any): Promise<IBook[]> => {
  // Initialize the queries object
  const queries: any = {};

  const regex = new RegExp(requestQueries.text, "i");
  if (requestQueries.text) {
    queries.$or = [
      { title: regex },
      { genre: regex },
      { author: regex },
      { publication_date: regex },
    ];
  }
  console.log('modified queries', queries)
  // Add other filter conditions as needed
  // For example, if you have filters like "author", "genre", etc., you can add them similarly

  // Uncomment the following lines if you have additional filters in the "filters" object:
  // if (filters.author) {
  //   queries.author = filters.author;
  // }
  // if (filters.genre) {
  //   queries.genre = filters.genre;
  // }
  // ...

  // Use the constructed queries to find books in the database
  const books = await Book.find(queries);

  return books;
};

const getSingleBook = async (
  bookId: mongoose.Types.ObjectId,
): Promise<IBook> => {
  const book = await Book.findOne({ _id: bookId })

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
    throw new ApiError(404, 'Only book owner can update the book details')
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
    throw new ApiError(404, 'Only book owner can delete the book')
  }

  const bookDelete = await Book.findByIdAndDelete({ _id: bookId })
  return bookDelete
}

const addReview = async (
  requestPayload: JwtPayload | null,
  commentWithBookId: IReview,
  bookId: mongoose.Types.ObjectId
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
