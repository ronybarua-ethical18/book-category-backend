import { IBook, IBookSearchFields } from './books.interface'
import { JwtPayload } from 'jsonwebtoken'
import { Book } from './books.model'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'

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
  const andConditions = [];

  console.log('filters', filters);

  if (filters) {
    const filterConditions = Object.keys(filters).map((field) => ({
      [field]: {
        $regex: new RegExp(filters[field], 'i'), // Use the filter value instead of the field name
      },
    }));

    if (filterConditions.length > 0) {
      andConditions.push(...filterConditions); // Spread the filter conditions into andConditions array
    }
  }

  const conditions = andConditions.length > 0 ? { $and: andConditions } : {};

  console.log('conditions', conditions);
  const books = await Book.find(conditions);
  return books;
};

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

export default {
  createBook,
  getAllBooks,
  getSingleBook,
}
