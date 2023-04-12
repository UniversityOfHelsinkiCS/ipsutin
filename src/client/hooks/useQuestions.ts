import getQuestionData from '../../server/data/questions'

import { Question } from '../types'

const useQuestions = () => {
  const questions: Question[] = getQuestionData()

  return questions
}

export default useQuestions
