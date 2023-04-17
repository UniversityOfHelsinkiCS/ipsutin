import React from 'react'
import { Box } from '@mui/material'

import { InputProps } from '../../types'

import styles from '../../styles'

const { cardStyles } = styles

const RenderResponses = ({ question, watch }: InputProps) => {
  const answer = question.optionData.options.find(
    (o) => o.id === watch(question.id.toString())
  )
  if (!answer.text) return null

  return (
    <Box sx={cardStyles.answerBox}>
      <div style={{ padding: 10 }}>{answer.text}</div>
    </Box>
  )
}

export default RenderResponses
