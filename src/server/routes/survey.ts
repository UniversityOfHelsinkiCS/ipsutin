import express from 'express'

import { Question, Survey } from '../db/models'

const surveyRouter = express.Router()

const sortByPriority = (a: Question, b: Question) => a.priority - b.priority

surveyRouter.get('/:name', async (req, res) => {
  const { name } = req.params

  const survey = await Survey.findOne({
    where: {
      name,
    },
    include: {
      model: Question,
    },
  })

  survey.Questions = survey.Questions.sort(sortByPriority)

  return res.send(survey)
})

export default surveyRouter
