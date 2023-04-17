// Dynamic imports to make build work in GitHub Actions
import logger from './logger'

// eslint-disable-next-line import/prefer-default-export
export const getQuestions = async () => {
  try {
    const getQuestionData: any = await import('../data/questions')
    const questions = getQuestionData.default()
    return questions
  } catch (error) {
    logger.error(error)
    return []
  }
}
