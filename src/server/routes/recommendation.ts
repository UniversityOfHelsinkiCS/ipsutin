import express from 'express'

import { getRecommendations } from '../services/recommendation'

const recommendationRouter = express.Router()

recommendationRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params

  const recommendations = await getRecommendations(surveyId)

  return res.send(recommendations)
})

export default recommendationRouter
