import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import { InputProps } from '../../types'
import styles from '../../styles'
import useRecommendations from '../../hooks/useRecommendations'

const ResultBox = ({ watch }: InputProps) => {
  const [resultId, setResultId] = useState(null)

  const { cardStyles, resultStyles } = styles

  const { recommendations, isLoading } = useRecommendations(2)

  const answers = watch()

  useEffect(() => {
    setResultId(
      Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1)) + Math.ceil(1))
    )
  }, [answers])

  if (isLoading) return null

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
