import getAssessmentQuestions from '../../data/assessmentQuestions'
import getIeQuestions from '../../data/ieQuestions'
import getLicenceQuestions from '../../data/licenceQuestions'
import { Question } from '../models'

const seedQuestions = async () => {
  const licenceQuestions = getLicenceQuestions()
  const ieQuestions = getIeQuestions()
  const assessmentQuestions = getAssessmentQuestions()

  const questions = [
    ...assessmentQuestions,
    ...licenceQuestions,
    ...ieQuestions,
  ]

  questions.forEach(async (question) => {
    await Question.upsert({
      ...question,
    })
  })
}

export default seedQuestions
