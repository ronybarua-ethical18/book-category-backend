// import config from '../../config'
// import config from '../../config'
import mongoose from 'mongoose'
import { IUser } from './users.interface'
import { User } from './users.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'

// get a single user
const addBookToWishList = async (
  bookId: mongoose.Types.ObjectId,
  requestPayload: JwtPayload | null
): Promise<IUser> => {
  const user = await User.findOneAndUpdate(
    {
      _id: requestPayload?.userId,
      wishlist: { $nin: [{ bookId: bookId }] }, // Ensure the bookId is not already in the wishlist
    },
    {
      $addToSet: {
        wishlist: { bookId: bookId },
      },
    },
    { new: true }
  )

  if (user) {
    return user
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
}

export default {
  addBookToWishList,
}
