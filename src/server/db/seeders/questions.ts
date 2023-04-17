import { Question } from '../models'
import { getQuestions } from '../../util/data'

const seedQuestions = async () => {
  const questions: any[] = await getQuestions()

  questions.forEach(async (question) => {
    await Question.upsert({
      ...question,
    })
  })
}

export default seedQuestions
