import { Response, Request, NextFunction } from 'express'

interface ApiError extends Error {
  statusCode?: number
}

export default function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500,
    message = err.message || 'Something unexpected'

  res.status(statusCode).json({ message })
}
