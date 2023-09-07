/* eslint-disable import/prefer-default-export */
import { Question, Survey } from '../db/models'
import NotFoundError from '../errors/NotFoundError'

const sortByPriority = (a: Question, b: Question) => a.priority - b.priority

export const getSurvey = async (surveyName: string): Promise<Survey> => {
  const survey = await Survey.findOne({
    where: {
      name: surveyName,
    },
    include: {
      model: Question,
    },
  })

  if (!survey)
    throw new NotFoundError(`Survey with the name: ${surveyName} not found`)

  survey.Questions = survey.Questions.sort(sortByPriority)

  return survey
}
