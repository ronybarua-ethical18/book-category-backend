// import config from '../../config'
// import config from '../../config'
import mongoose from 'mongoose'
import { IUser } from './users.interface'
import { User } from './users.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { IBook } from '../books/books.interface'

// get a single user
const addBookToWishList = async (
  bookId: mongoose.Types.ObjectId,
  requestPayload: JwtPayload | null
): Promise<IUser> => {
  const userId = requestPayload?.userId
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const wishlist = user.wishlist
  const bookIndex = wishlist.findIndex(item => item.bookId.equals(bookId))

  if (bookIndex !== -1) {
    wishlist.splice(bookIndex, 1) // Pop the existing bookId from wishlist array
  } else {
    wishlist.push({ bookId: bookId }) // Push the new bookId to wishlist array
  }

  user.wishlist = wishlist
  await user.save()

  return user
}

const getBooksFromWishlist = async (
  requestPayload: JwtPayload | null
): Promise<IUser> => {
  const user = await User.findOne({ _id: requestPayload?.userId }).populate(
    'wishlist.bookId'
  )

  if (!user) {
    throw new ApiError(404, 'user not found')
  }
  return user
}

export default {
  addBookToWishList,
  getBooksFromWishlist,
}
