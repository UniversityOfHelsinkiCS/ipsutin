import Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError, ValidationError } from 'sequelize'

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

  if (error.message === 'Unauthorized') {
    return res
      .status(401)
      .send({ error: 'Unauthorized access', data: { error } })
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
  if (error.message === 'Entry not found') {
    return res.status(404).send({ error: 'Entry not found', data: { error } })
  }

  return next(error)
}

export default errorHandler
