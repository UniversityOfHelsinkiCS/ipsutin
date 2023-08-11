import express from 'express'

import { getResults } from '../services/result'

const resultRouter = express.Router()

resultRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params

  const results = await getResults(surveyId)

  return res.send(results)
})

export default resultRouter
