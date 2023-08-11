import express from 'express'

import { Entry } from '../db/models'
import accessHandler from '../middeware/admin'
import { RequestWithUser } from '../types'

const entryRouter = express.Router()

entryRouter.get('/', accessHandler, async (req: RequestWithUser, res) => {
  const entry = await Entry.findAll({})

  return res.status(200).send(entry)
})

entryRouter.get(
  '/:entryId',
  accessHandler,
  async (req: RequestWithUser, res) => {
    const { entryId } = req.params

    const entry = await Entry.findByPk(entryId)

    if (!entry) throw new Error('Entry not found')

    return res.status(200).send(entry)
  }
)

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
    sessionToken,
  })

  return res.status(201).send(newEntry)
})

export default entryRouter
