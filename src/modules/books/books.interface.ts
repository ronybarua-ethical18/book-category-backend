import { Model, Types } from 'mongoose'

interface IReview {
  user: string
  comment: string
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
