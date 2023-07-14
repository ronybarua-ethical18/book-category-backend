import express from 'express'
import usersController from './users.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()


router.get('/', auth(ENUM_USER_ROLE.ADMIN), usersController.getAllUsers)

export default router
