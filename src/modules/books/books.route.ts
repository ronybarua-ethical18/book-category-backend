import express from 'express'
import auth from '../../middlewares/auth'
import booksController from './books.controller'
import { BookValidation } from './books.validation'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  auth(),
  booksController.createBook
)
router.get('/', auth(), booksController.getAllBooks)
router.get('/:id', auth(), booksController.getSingleBook)
router.put('/:id', auth(), booksController.updateBook)
router.delete('/:id', auth(), booksController.deleteBook)
router.patch('/reviews/:id', auth(), booksController.addReview)

export default router
