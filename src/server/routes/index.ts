import * as Sentry from '@sentry/node'
import cors from 'cors'
import express from 'express'

import { inDevelopment, inE2EMode, inStaging } from '../../config'
import accessLogger from '../middleware/access'
import errorHandler from '../middleware/error'
import shibbolethMiddleware from '../middleware/shibboleth'
import userMiddleware from '../middleware/user'
import initializeSentry from '../util/sentry'

import analyticRouter from './analytic'
import entryRouter from './entry'
import facultyRouter from './faculty'
import llmRouter from './llm'
import loginRouter from './login'
import recommendationRouter from './recommendation'
import resultRouter from './result'
import summaryRouter from './summary'
import surveyRouter from './survey'
import testRouter from './test'
import userRouter from './user'

const router = express()

initializeSentry()

router.use(cors())
router.use(express.json())

router.use(shibbolethMiddleware)
if (inDevelopment || inE2EMode) router.use(userMiddleware)

router.use(accessLogger)

if (inStaging) router.use('/test', testRouter)

router.use('/results', resultRouter)
router.use('/faculties', facultyRouter)
router.use('/surveys', surveyRouter)
router.use('/entries', entryRouter)
router.use('/users', userRouter)
router.use('/summary', summaryRouter)
router.use('/recommendations', recommendationRouter)
router.use('/login', loginRouter)
router.use('/analytics', analyticRouter)
router.use('/llm', llmRouter)

Sentry.setupExpressErrorHandler(router)
router.use(errorHandler)

export default router
