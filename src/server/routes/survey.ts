import express from 'express'

import { getSurvey } from '../services/survey'

const surveyRouter = express.Router()

surveyRouter.get('/:name', async (req, res) => {
  const { name } = req.params

  const survey = await getSurvey(name)

  return res.send(survey)
})

export default surveyRouter
