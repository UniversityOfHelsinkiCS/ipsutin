import { Survey } from '../models'

const surveys = [
  {
    id: 1,
    name: 'ipAssesment',
  },
  {
    id: 2,
    name: 'licenses',
  },
  {
    id: 3,
    name: 'ideaEvaluation',
  },
]

const seedSurveys = async () => {
  surveys.forEach(async (survey) => {
    await Survey.upsert({
      ...survey,
    })
  })
}

export default seedSurveys
