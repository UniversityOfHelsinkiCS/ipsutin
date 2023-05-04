import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import getIEresults from '../../../server/data/ieResults'
import { InputProps } from '../../types'
import styles from '../../styles'

const ResultBox = ({ watch }: InputProps) => {
  const [resultId, setResultId] = useState(null)

  const { cardStyles, resultStyles } = styles

  const results = getIEresults()

  const answers = watch()

  useEffect(() => {
    setResultId(
      Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1)) + Math.ceil(1))
    )
  }, [answers])

  return (
    <Box sx={resultStyles.resultBox}>
      <Box sx={cardStyles.card}>
        <h2>Results</h2>
        {resultId && (
          <Box>
            {
              results.find((result: { id: number }) => result.id === resultId)
                .name
            }
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ResultBox
