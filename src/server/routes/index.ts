import express from 'express'
import cors from 'cors'
import { Handlers as SentryHandlers } from '@sentry/node'

import shibbolethMiddleware from '../middeware/shibboleth'
import userMiddleware from '../middeware/user'
import initializeSentry from '../util/sentry'
import errorHandler from '../middeware/error'
import accessLogger from '../middeware/access'
import surveyRouter from './survey'
import entryRouter from './entry'
import userRouter from './user'
import summaryRouter from './summary'
import recommendationRouter from './recommendation'
import facultyRouter from './faculty'

const router = express()

initializeSentry(router)

router.use(SentryHandlers.requestHandler())
router.use(SentryHandlers.tracingHandler())

router.use(cors())
router.use(express.json())

router.use(shibbolethMiddleware)
router.use(userMiddleware)

router.use(accessLogger)

router.use('/faculties', facultyRouter)
router.use('/surveys', surveyRouter)
router.use('/entries', entryRouter)
router.use('/users', userRouter)
router.use('/summary', summaryRouter)
router.use('/recommendations', recommendationRouter)

router.use(SentryHandlers.errorHandler())
router.use(errorHandler)

export default router
