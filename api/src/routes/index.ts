import { Router } from 'express'
import authRouter from './authRouter'

export const routes = Router()

routes.use('/auth', authRouter)