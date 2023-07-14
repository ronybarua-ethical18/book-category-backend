// import config from '../../config'
// import config from '../../config'
import mongoose from 'mongoose'
import { IUser } from './users.interface'
import { User } from './users.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'

// get a single user
const getMyProfile = async (
  requestPayload: JwtPayload | null
): Promise<IUser> => {
  const user = await User.findById({
    _id: new mongoose.Types.ObjectId(requestPayload?.userId),
    role: requestPayload?.role,
  })

  if (user) {
    return user
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
}


export default {
  getMyProfile
}
