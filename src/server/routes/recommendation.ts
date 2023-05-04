import express from 'express'

import { Recommendation } from '../db/models'

const recommendationRouter = express.Router()

recommendationRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params

  const recommendations = await Recommendation.findAll({
    where: {
      surveyId,
    },
  })

  return res.send(recommendations)
})

export default recommendationRouter
