import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import authController from './auth.controller'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(AuthValidation.signUpZodSchema),
  authController.signUp
)
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  authController.loginUser
)

export default router
