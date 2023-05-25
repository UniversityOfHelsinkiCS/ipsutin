import express from 'express'

import { Result } from '../db/models'

const resultRouter = express.Router()

resultRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params

  const results = await Result.findAll({
    where: {
      surveyId,
    },
  })

  return res.send(results)
})

export default resultRouter
