import { Entry, Survey, User } from '../db/models'
import NotFoundError from '../errors/NotFoundError'
import { EntryValues, EntryWithSurvey } from '../types'
import logger from '../util/logger'

export const getEntries = async (): Promise<EntryWithSurvey[]> => {
  const entries = (await Entry.findAll({
    include: Survey,
    order: [['updatedAt', 'DESC']],
  })) as unknown as EntryWithSurvey[]

  return entries
}

export const getEntriesBySurvey = async (
  surveyName: string
): Promise<EntryWithSurvey[]> => {
  const entries = (await Entry.findAll({
    include: {
      model: Survey,
      where: {
        name: surveyName,
      },
    },
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

  const user = await User.findByPk(userId)

  data.faculty = user?.preferredFaculty || 'OTHER'

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
    const entry = existingEntry?.toJSON()
    logger.info('Existing entry found. Updated entry: ', {
      ...entry,
      isExisting: true,
    })

    return existingEntry
  }

  const newEntry = await Entry.create({
    surveyId: Number(surveyId),
    userId,
    data,
    sessionToken,
  })

  const entry = newEntry?.toJSON()

  logger.info('Existing entry not found. Created new entry: ', {
    ...entry,
    isExisting: false,
  })

  return newEntry
}
