/* eslint-disable import/prefer-default-export */
import { Question, Survey } from '../db/models'

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

  survey.Questions = survey.Questions.sort(sortByPriority)

  return survey
}
