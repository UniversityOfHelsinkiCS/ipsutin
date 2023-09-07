import { NextFunction, Response } from 'express'

import UnauthorizedError from '../errors/UnauthorizedError'

const adminHandler = (req: any, res: Response, next: NextFunction) => {
  if (!req?.user.isAdmin) throw new UnauthorizedError('Unauthorized access')

  return next()
}

export default adminHandler
