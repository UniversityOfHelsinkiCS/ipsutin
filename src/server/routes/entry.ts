import express from 'express'

import accessHandler from '../middleware/admin'
import { createEntry, getEntries, getEntry } from '../services/entry'
import { RequestWithUser } from '../types'

const entryRouter = express.Router()

entryRouter.get('/', accessHandler, async (req: RequestWithUser, res) => {
  const entries = await getEntries()

  return res.status(200).send(entries)
})

entryRouter.get(
  '/:entryId',
  accessHandler,
  async (req: RequestWithUser, res) => {
    const { entryId } = req.params

    const entry = await getEntry(entryId)

    return res.status(200).send(entry)
  }
)

entryRouter.post('/:surveyId', async (req: RequestWithUser, res) => {
  const { surveyId } = req.params

  const entry = await createEntry(surveyId, req.body)

  return res.status(201).send(entry)
})

export default entryRouter
