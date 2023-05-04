import { Question } from '../models'
import { getQuestions } from '../../util/data'
import getIeQuestionData from '../../data/ieQuestions'

const seedQuestions = async () => {
  const questions: any[] = await getQuestions()
  const ieQuestions: any[] = getIeQuestionData()

  questions.forEach(async (question) => {
    await Question.upsert({
      ...question,
    })
  })

  ieQuestions.forEach(async (question) => {
    await Question.upsert({
      ...question,
    })
  })
}

export default seedQuestions
