import UnauthorizedError from '@backend/errors/UnauthorizedError'
import { NextFunction, Response } from 'express'

const adminHandler = (req: any, res: Response, next: NextFunction) => {
  if (!req?.user.isAdmin) throw new UnauthorizedError('Unauthorized access')

  return next()
}

export default adminHandler
