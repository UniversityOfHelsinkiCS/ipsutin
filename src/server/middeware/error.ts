import { Request, Response, NextFunction } from 'express'
import Sentry from '@sentry/node'

import logger from '../util/logger'

import { inProduction } from '../../config'

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
