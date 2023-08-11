import { NextFunction, Response } from 'express'

import { RequestWithUser } from '../types'

const accessHandler = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin) throw new Error('Unauthorized')

  return next()
}

export default accessHandler
