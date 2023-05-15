import { Question } from '../models'
import getLicenseQuestions from '../../data/licenseQuestions'
import getIeQuestions from '../../data/ieQuestions'
import getAssessmentQuestions from '../../data/assessmentQuestions'

const seedQuestions = async () => {
  const licenseQuestions: any[] = getLicenseQuestions()
  const ieQuestions: any[] = getIeQuestions()
  const assessmentQuestions: any[] = getAssessmentQuestions()

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
