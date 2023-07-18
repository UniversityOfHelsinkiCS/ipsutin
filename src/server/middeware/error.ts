import Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'

import { inProduction } from '../../config'
import logger from '../util/logger'

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${error.message} ${error.name} ${error.stack}`)

  if (inProduction) Sentry.captureException(error)

  return next(error)
}

export default errorHandler
