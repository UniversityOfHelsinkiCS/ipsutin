import { Entry, Survey } from '../db/models'
import NotFoundError from '../errors/NotFoundError'
import { EntryValues, EntryWithSurvey } from '../types'

export const getEntries = async (): Promise<EntryWithSurvey[]> => {
  const entries = (await Entry.findAll({
    include: Survey,
    order: [['updatedAt', 'DESC']],
  })) as unknown as EntryWithSurvey[]

  return entries
}

export const getEntry = async (entryId: string): Promise<Entry> => {
  const entry = await Entry.findByPk(entryId, { include: Survey })

  if (!entry) throw new NotFoundError('Entry not found')

  return entry
}

export const createEntry = async (
  userId: string,
  surveyId: string,
  body: EntryValues
) => {
  const { sessionToken, data } = body

  const existingEntry = await Entry.findOne({
    where: {
      surveyId,
      userId,
      sessionToken,
    },
  })

  if (existingEntry) {
    await existingEntry.update({
      data,
    })

    return existingEntry
  }

  const newEntry = await Entry.create({
    surveyId: Number(surveyId),
    userId,
    data,
    sessionToken,
  })

  return newEntry
}
