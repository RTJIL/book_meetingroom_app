import 'express'

import 'express'

declare global {
  namespace Express {
    interface User {
      id: number
      role: 'Admin' | 'User'
      email: string
      name: string
    }

    interface Request {
      user?: User
    }
  }
}
