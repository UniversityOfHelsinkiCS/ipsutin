import getAssessmentQuestions from '../../data/assessmentQuestions'
import getIeQuestions from '../../data/ieQuestions'
import getLicenseQuestions from '../../data/licenseQuestions'
import { Question } from '../models'

const seedQuestions = async () => {
  const licenseQuestions = getLicenseQuestions()
  const ieQuestions = getIeQuestions()
  const assessmentQuestions = getAssessmentQuestions()

  const questions = [
    ...assessmentQuestions,
    ...licenseQuestions,
    ...ieQuestions,
  ]

  questions.forEach(async (question) => {
    await Question.upsert({
      ...question,
    })
  })
}

export default seedQuestions
