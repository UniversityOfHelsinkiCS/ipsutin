import { Question } from '../models'
import getLicenseQuestions from '../../data/licenseQuestions'
import getIeQuestions from '../../data/ieQuestions'

const seedQuestions = async () => {
  const licenseQuestions: any[] = getLicenseQuestions()
  const ieQuestions: any[] = getIeQuestions()

  const questions = [...licenseQuestions, ...ieQuestions]

  questions.forEach(async (question) => {
    await Question.upsert({
      ...question,
    })
  })
}

export default seedQuestions
