import { Survey } from '../models'

const surveyName = 'testSurvey'

const seedSurveys = async () => {
  await Survey.upsert({
    id: 1,
    name: surveyName,
  })

  await Survey.upsert({
    id: 2,
    name: 'ideaEvaluation',
  })
}

export default seedSurveys
