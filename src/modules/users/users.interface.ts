import { Model, Types } from 'mongoose'

export type IUser = {
  _id?: Types.ObjectId
  password: string
  email: string
  name: {
    firstName: string
    lastName: string
  }
  wishlist: [
    {
      bookId: Types.ObjectId
    }
  ]
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string, id?: string): Promise<IUser>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

// export type UserModel = Model<IUserStatics>
