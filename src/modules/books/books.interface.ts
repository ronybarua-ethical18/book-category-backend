import { Model, Types } from 'mongoose'

export interface IReview {
  [x: string]: any
  user: string
  comment: string
  bookId?: Types.ObjectId
}

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: string
  reviews: IReview
  user: Types.ObjectId
}

export type IBookSearchFields = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
}
