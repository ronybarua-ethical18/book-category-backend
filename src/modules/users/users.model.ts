/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, UserModel } from './users.interface'
import config from '../../config'

const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false, // Hide the hashedPassword field in response object to prevent leakage of sensitive
    },
  },
  {
    timestamps: true,
  }
)

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email: email }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

// User.create() / user.save()
userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

//remove password field
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}
export const User = mongoose.model<IUser, UserModel>('User', userSchema)
