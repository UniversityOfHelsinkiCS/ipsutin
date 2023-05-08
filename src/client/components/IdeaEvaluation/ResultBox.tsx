/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import { InputProps } from '../../types'
import styles from '../../styles'
import useSurvey from '../../hooks/useSurvey'
import useRecommendations from '../../hooks/useRecommendations'
import { getIeRecommendationScores, sortRecommendations } from './util'

const ResultBox = ({ watch }: InputProps) => {
  const [resultSequence, setResultSequence] = useState([])
  const { cardStyles, resultStyles } = styles
  const { survey } = useSurvey('ideaEvaluation')
  const { recommendations, isSuccess } = useRecommendations(survey?.id)

  const answers = watch()

  useEffect(() => {
    if (recommendations) {
      const recommendationScores = getIeRecommendationScores(
        answers,
        recommendations
      )
      const sortedRecommendations = sortRecommendations(
        recommendations,
        recommendationScores
      )

      setResultSequence(sortedRecommendations)
    }
  }, [JSON.stringify(answers)])

  if (!isSuccess) return null

  return (
    <Box sx={resultStyles.resultBox}>
      <Box sx={cardStyles.card}>
        <h2>Results</h2>
        <Box>
          {resultSequence.map((result) => (
            <p key={result.id}>{result.title.en}</p>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ResultBox
