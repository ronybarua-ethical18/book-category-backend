import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import { ILoginUser, ILoginUserResponse } from './auth.interface'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import { User } from '../users/users.model'
import config from '../../config'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password
  )

  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  const { _id: userId, email: userEmail } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken,
  }
}

export const AuthService = {
  loginUser,
}
