export interface JwtPayload {
  userId: number
  role: 'Admin' | 'User'
  iat?: number
  exp?: number
}

export interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'User'
}
