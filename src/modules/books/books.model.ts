/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose'
import { IBook } from './books.interface'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
    },
    publication_date: {
      type: String,
    },
    img_url: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    reviews: [
      {
        user: {
          type: String,
        },
        comment: {
          type: String,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export const Book = mongoose.model<IBook>('Book', bookSchema)
