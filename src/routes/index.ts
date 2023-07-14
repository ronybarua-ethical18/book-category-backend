import express, { Router } from 'express'
import authRoute from '../modules/auth/auth.route'
import userRoutes from '../modules/users/users.route'

const router = express.Router()

type IRoute = {
  path: string
  route: Router
}


const routeList: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },

]

routeList.forEach(route => {
  router.use(route.path, route.route)
})

export default router
