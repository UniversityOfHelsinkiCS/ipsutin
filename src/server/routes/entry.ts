import express from 'express'

import adminHandler from '../middleware/admin'
import { createEntry, getEntries, getEntry } from '../services/entry'
import { RequestWithUser } from '../types'

const entryRouter = express.Router()

entryRouter.get('/', adminHandler, async (req, res) => {
  const entries = await getEntries()

  return res.status(200).send(entries)
})

entryRouter.get('/:entryId', adminHandler, async (req, res) => {
  const { entryId } = req.params

  const entry = await getEntry(entryId)

  return res.status(200).send(entry)
})

entryRouter.post('/:surveyId', async (req: RequestWithUser, res: any) => {
  const { surveyId } = req.params
  const { id: userId } = req.user

  const entry = await createEntry(userId, surveyId, req.body)

  return res.status(201).send(entry)
})

export default entryRouter
