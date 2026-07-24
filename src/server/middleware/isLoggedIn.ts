import { NextFunction, Request, Response } from 'express'

import { RequestWithUser } from '../types'
import UnauthorizedError from '../errors/UnauthorizedError'

const isLoggedInMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!(req as RequestWithUser)?.user) {
    throw new UnauthorizedError('Unauthorized access')
  }

  return next()
}

export default isLoggedInMiddleware