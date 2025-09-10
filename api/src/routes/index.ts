import { Router } from 'express'

import authRouter from './authRouter'
import roomRouter from './roomRouter'
import bookingRouter from './bookingRouter'

export const routes = Router()

routes.use('/auth', authRouter)
routes.use('/rooms', roomRouter)
routes.use('/book', bookingRouter)