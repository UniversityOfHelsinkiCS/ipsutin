import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { InputProps, Locales, PossibleChoiceTypes, Question } from '../../types'
import styles from '../../styles'
import MultiChoice from '../Choices/MultiChoice'
import SingleChoice from '../Choices/SingleChoice'
import DimensionSelect from '../Choices/DimensionSelect'
import Markdown from '../Common/Markdown'
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
      <Typography component="span">
        {question.title[language]}
        <ShowMore text={question.text[language as keyof Locales]} />
      </Typography>
    )

  return (
    <>
      <Markdown>{question.title[language]}</Markdown>
      <Box sx={cardStyles.content}>
        <Markdown>{question.text[language]}</Markdown>
      </Box>
    </>
  )
}

const RenderQuestions = ({
  control,
  watch,
  question,
  questions,
  language,
}: InputProps) => {
  if (question.visibility?.options) {
    const [...options] = question.visibility.options

    const parent = watch(question.parentId.toString())

    if (!options.includes(parent)) return null
  }

  const components: {
    [key in PossibleChoiceTypes]: (...args: InputProps[]) => JSX.Element
  } = {
    singleChoice: SingleChoice,
    multipleChoice: MultiChoice,
    dimensions: DimensionSelect,
    info: SingleChoice,
  }

  const Choice = components[question.optionData.type as PossibleChoiceTypes]

  if (!Choice) return null

  const childQuestions = questions.filter(
    (childQuestion) => question.id === childQuestion.parentId
  )

  return (
    <Container sx={cardStyles.questionsContainer}>
      <QuestionText question={question} language={language as keyof Locales} />
      <Choice
        key={question.id}
        control={control}
        watch={watch}
        question={question}
        language={language}
      >
        {childQuestions &&
          childQuestions.map((children) => (
            <RenderQuestions
              key={children.id}
              control={control}
              watch={watch}
              question={children}
              questions={childQuestions}
              language={language}
            />
          ))}
      </Choice>
    </Container>
  )
}

export default RenderQuestions
