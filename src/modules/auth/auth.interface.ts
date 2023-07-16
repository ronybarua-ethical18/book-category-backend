import { ENUM_USER_ROLE } from '../../enums/user'

export type ILoginUser = {
  // id: string,
  email: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string
  wishList?: object[]
}

export type IVerifiedLoginUser = {
  userId: string
  role: ENUM_USER_ROLE
}
