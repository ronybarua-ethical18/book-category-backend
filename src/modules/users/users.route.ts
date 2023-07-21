import express from 'express'
import usersController from './users.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post('/wishlist', auth(), usersController.addBookToWishList)
router.get('/wishlist', auth(), usersController.getBooksFromWishlist)

export default router
