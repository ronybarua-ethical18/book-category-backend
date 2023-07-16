import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../errors/ApiError'
import { jwtHelpers } from '../helpers/jwtHelpers'
import config from '../config'
// import { AuthenticatedRequest } from '../shared/interfaces/AuthRequest.interface'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    console.log('request user', requiredRoles)
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser = null

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

      if (verifiedUser) {
        req.user = verifiedUser
      } else {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
