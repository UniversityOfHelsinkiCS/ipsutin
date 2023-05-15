import React from 'react'
import { Box } from '@mui/material'

import { InputProps } from '../../types'

import styles from '../../styles'
import ShowMore from '../Common/ShowMore'
import Markdown from '../Common/Markdown'

const { cardStyles } = styles

const RenderResponses = ({ question, watch }: InputProps) => {
  const answer = question.optionData.options.find(
    (option) => option.id === watch(question.id.toString())
  )

  if (answer.text)
    return (
      <Box sx={cardStyles.answerBox}>
        <div style={{ padding: 10 }}>{answer.text}</div>
      </Box>
    )

  if (answer.results)
    return (
      <Box sx={cardStyles.answerBox}>
        <Box sx={{ padding: 1 }}>
          <Markdown>{answer.results.title}</Markdown>
        </Box>
        {answer.results.data.map(
          (result: { label: string; text: string; info: string }) => (
            <Box sx={{ padding: 1 }}>
              {result.label} {result.text}
              {result.info && <ShowMore text={result.info} />}
            </Box>
          )
        )}
      </Box>
    )

  return null
}

export default RenderResponses
