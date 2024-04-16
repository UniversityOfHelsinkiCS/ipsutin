import React from 'react'
import { Locales, PossibleChoiceTypes, Question } from '@backend/types'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import { InputProps } from '../../types'
import MultiChoice from '../Choices/MultiChoice'
import SingleChoice from '../Choices/SingleChoice'
import ShowMore from '../Common/ShowMore'

const { cardStyles } = styles

const QuestionText = ({
  question,
  language,
}: {
  question: Question
  language: keyof Locales
}) => {
  if (question.optionData.type === 'info')
    return (
      <Typography component='span'>
        {question.title[language]}
        <ShowMore text={question.text[language as keyof Locales]} />
      </Typography>
    )

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography component='span'>
        <span className='questions'>{question.title[language]}</span>
        {question.text[language] && (
          <ShowMore text={question.text[language as keyof Locales]} />
        )}
      </Typography>
    </Box>
  )
}

const RenderQuestions = ({
  control,
  watch,
  question,
  questions,
  language,
}: InputProps) => {
  if (!question || !questions || !watch) return null

  if (question.visibility?.options) {
    const [...options] = question.visibility.options

    if (question.parentId !== null) {
      const parent = watch(question.parentId.toString())

      if (!options.includes(parent)) return null
    }
  }

  const components: {
    [key in PossibleChoiceTypes]: (...args: InputProps[]) => JSX.Element | null
  } = {
    singleChoice: SingleChoice,
    multipleChoice: MultiChoice,
    info: SingleChoice,
  }

  const Choice = components[question.optionData.type as PossibleChoiceTypes]

  if (!Choice) return null

  const childQuestions = questions.filter(
    (childQuestion) => question.id === childQuestion.parentId
  )

  return (
    <Box sx={cardStyles.questionsContainer}>
      <QuestionText question={question} language={language as keyof Locales} />
      <Choice
        key={question.id}
        control={control}
        watch={watch}
        question={question}
        language={language}
      >
        {childQuestions?.map((children) => (
          <RenderQuestions
            key={children.id}
            control={control}
            watch={watch}
            question={children}
            questions={questions}
            language={language}
          />
        ))}
      </Choice>
    </Box>
  )
}

export default RenderQuestions
