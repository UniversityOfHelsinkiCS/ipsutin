import express from 'express'

import adminHandler from '../middleware/admin'
import {
  getFacultyCounts,
  getSurveyAnswerDistribution,
  getSurveyCounts,
  getUserCounts,
} from '../services/analytic'

const analyticRouter = express.Router()

analyticRouter.get('/counts/user', adminHandler, async (req, res) => {
  const userCounts = await getUserCounts()

  return res.status(200).send(userCounts)
})

analyticRouter.get('/counts/faculty', adminHandler, async (req, res) => {
  const facultyCounts = await getFacultyCounts()

  return res.status(200).send(facultyCounts)
})

analyticRouter.get('/counts/survey', adminHandler, async (req, res) => {
  const surveyCounts = await getSurveyCounts()

  return res.status(200).send(surveyCounts)
})

analyticRouter.get(
  '/distribution/:surveyName',
  adminHandler,
  async (req, res) => {
    const { surveyName } = req.params

    const surveyAnswerDistribution =
      await getSurveyAnswerDistribution(surveyName)

    return res.status(200).send(surveyAnswerDistribution)
  }
)

export default analyticRouter
