import express from 'express'

import { RequestWithUser } from '../types'
import { Entry } from '../db/models'

const entryRouter = express.Router()

entryRouter.post('/:surveyId', async (req: RequestWithUser, res) => {
  const { surveyId } = req.params
  const { data, sessionToken } = req.body

  const existingEntry = await Entry.findOne({
    where: {
      surveyId,
      sessionToken,
    },
  })

  if (existingEntry) {
    await existingEntry.update({
      data,
    })

    return res.status(200).send(existingEntry)
  }

  const newEntry = await Entry.create({
    surveyId: Number(surveyId),
    data,
  })

  return res.status(201).send(newEntry)
})

export default entryRouter
