import { RequestWithUser } from '@backend/types'
import { NextFunction, Request, Response } from 'express'

import UnauthorizedError from '../errors/UnauthorizedError'

const adminHandler = (req: Request, _: Response, next: NextFunction) => {
  if (!(req as RequestWithUser)?.user?.isAdmin)
    throw new UnauthorizedError('Unauthorized access')

  return next()
}

export default adminHandler
