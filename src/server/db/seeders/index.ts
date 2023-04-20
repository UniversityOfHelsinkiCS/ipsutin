import logger from '../../util/logger'
import seedSurveys from './surveys'
import seedQuestions from './questions'
import seedRecommendations from './recommendations'
import seedResults from './results'
import seedUsers from './user'

const seed = async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1_000))

  try {
    await seedSurveys()
    await seedQuestions()
    await seedRecommendations()
    await seedResults()
    await seedUsers()
    logger.info('Seeding successful')
  } catch (e) {
    logger.error('Seeding failed: ', e)
  }
}

export default seed
