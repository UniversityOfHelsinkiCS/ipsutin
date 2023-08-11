/* eslint-disable import/prefer-default-export */
import { Result } from '../db/models'

export const getResults = async (surveyId: string): Promise<Result[]> => {
  const results = await Result.findAll({
    where: {
      surveyId,
    },
  })

  return results
}
