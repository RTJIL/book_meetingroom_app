import { Request, Response, NextFunction } from 'express'
import { RequestHandler } from 'express'
import passport from '../config/passport'

import { User } from '../types/authTypes'

export const jwtAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ;(
    passport.authenticate(
      'jwt',
      { session: false },
      (err: Error, user: User, _info: string) => {
        if (err) return next(err)

        if (!user) return res.status(401).json({ message: 'Unauthorized' })

        req.user = user
        next()
      }
    ) as RequestHandler
  )(req, res, next)
}
