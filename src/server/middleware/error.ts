import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError, ValidationError } from 'sequelize'

import { inProduction, inStaging } from '../../config'
import ZodValidationError from '../errors/ValidationError'
import logger from '../util/logger'

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${error.message} ${error.name} ${error.stack}`)

  if (inProduction || inStaging) Sentry.captureException(error)

  if (error.name === 'ZodValidationError') {
    return res.status(400).send({
      error: error.message,
      data: (error as ZodValidationError).errors,
    })
  }

  if (error.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .send({ error: error.message, data: (error as ValidationError).errors })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({
      error: error.message,
      data: (error as UniqueConstraintError).errors,
    })
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).send({
      error: error.message,
      data: null,
    })
  }

  if (error.name === 'NotFoundError') {
    return res.status(404).send({
      error: error.message,
      data: null,
    })
  }

  return next(error)
}

export default errorHandler
