import getQuestionData from '../../server/data/ieQuestions'

import { Question } from '../types'

const useQuestions = () => {
  const questions: Question[] = getQuestionData()

  return questions
}

export default useQuestions
