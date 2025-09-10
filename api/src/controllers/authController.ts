import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from '../config/env'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import authService from '../services/authService'
import userService from '../services/userService'

import { SigninInput, SignupInput } from '../types/authShemas'

export default {
  signUp: async (
    req: Request<object, object, SignupInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password, role } = req.body

    try {
      const exist = await userService.findByEmail(email)
      if (exist) return res.status(400).json({ message: 'Email is taken' })

      const user = await authService.signUp(name, email, password, role)
      res.status(200).json(user)
    } catch (err) {
      return next(err)
    }
  },

  signIn: async (
    req: Request<object, object, SigninInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body

    try {
      const user = await userService.findByEmail(email)
      if (!user) return res.status(400).json({ message: 'Wrong credentials' })

      const isSame = await bcrypt.compare(password, user.password)
      if (!isSame) return res.status(400).json({ message: 'Wrong credentials' })

      if (!JWT_SECRET) return res.status(500).json({ message: 'Server error' })

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ token })
    } catch (err) {
      return next(err)
    }
  },
}
