import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import { InputProps } from '../../types'
import styles from '../../styles'
import useSurvey from '../../hooks/useSurvey'
import useRecommendations from '../../hooks/useRecommendations'

const ResultBox = ({ watch }: InputProps) => {
  const [resultId, setResultId] = useState(null)

  const { cardStyles, resultStyles } = styles

  const { survey } = useSurvey('ideaEvaluation')
  const { recommendations, isSuccess } = useRecommendations(survey?.id)

  const answers = watch()

  useEffect(() => {
    setResultId(
      Math.floor(
        Math.random() * (Math.floor(305) - Math.ceil(301)) + Math.ceil(301)
      )
    )
  }, [answers])

  if (!isSuccess) return null

  return (
    <Box sx={resultStyles.resultBox}>
      <Box sx={cardStyles.card}>
        <h2>Results</h2>
        {resultId && (
          <Box>
            {
              recommendations.find(
                (result: { id: number }) => result.id === resultId
              ).title.en
            }
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ResultBox
