import express from 'express'
import usersController from '../users/users.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../users/users.validation'
import { AuthValidation } from './auth.validation'
import authController from './auth.controller'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  usersController.createUser
)
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  authController.loginUser
)


export default router
