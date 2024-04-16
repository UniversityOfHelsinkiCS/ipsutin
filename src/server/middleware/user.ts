import { NextFunction, Request, Response } from 'express'

import mockUser from '../mocs/user'

const userMiddleware = (req: Request, _: Response, next: NextFunction) => {
  if (req.path.includes('/login')) return next()

  req.user = mockUser

  return next()
}

export default userMiddleware
