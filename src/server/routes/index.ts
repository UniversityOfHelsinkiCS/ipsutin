import { Handlers as SentryHandlers } from '@sentry/node'
import cors from 'cors'
import express from 'express'

import { inStaging } from '../../config'
import accessLogger from '../middeware/access'
import errorHandler from '../middeware/error'
import shibbolethMiddleware from '../middeware/shibboleth'
import userMiddleware from '../middeware/user'
import initializeSentry from '../util/sentry'

import entryRouter from './entry'
import facultyRouter from './faculty'
import recommendationRouter from './recommendation'
import resultRouter from './result'
import summaryRouter from './summary'
import surveyRouter from './survey'
import testRouter from './test'
import userRouter from './user'

const router = express()

initializeSentry(router)

router.use(SentryHandlers.requestHandler())
router.use(SentryHandlers.tracingHandler())

router.use(cors())
router.use(express.json())

router.use(shibbolethMiddleware)
router.use(userMiddleware)

router.use(accessLogger)

if (inStaging) router.use('/test', testRouter)

router.use('/results', resultRouter)
router.use('/faculties', facultyRouter)
router.use('/surveys', surveyRouter)
router.use('/entries', entryRouter)
router.use('/users', userRouter)
router.use('/summary', summaryRouter)
router.use('/recommendations', recommendationRouter)

router.use(SentryHandlers.errorHandler())
router.use(errorHandler)

export default router
