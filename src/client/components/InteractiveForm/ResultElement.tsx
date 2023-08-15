import React from 'react'
import {
  IPAssessmentResult,
  Locales,
  RecommendationLabel,
} from '@backend/types'
import { Box, Container } from '@mui/material'
import { ResultWithLabels } from 'src/client/types'

import colors from '../../util/colors'
import Markdown from '../Common/Markdown'

const ResultElement = ({
  language,
  resultData,
  dimensions,
}: {
  language: keyof Locales
  resultData: ResultWithLabels | IPAssessmentResult
  dimensions: RecommendationLabel[]
}) => {
  if (!resultData) return null

  return (
    <Container
      style={{
        margin: '2rem 0 2rem 0',
        borderLeft: 'solid',
        borderColor: '#9ca3af',
        borderWidth: '1px',
      }}
    >
      <Box style={{ margin: '2rem 0 2rem 1rem' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>

      <Box
        style={{
          margin: '2rem 0 2rem 0',
        }}
      >
        {dimensions.map((dimension) => {
          const color = colors[dimension] || null
          return (
            <Box
              data-cy={`result-wrapper-${resultData.optionLabel}-${dimension}`}
              key={`${JSON.stringify(resultData)}.${dimension}`}
              style={{
                margin: '1rem',
                padding: '0 2rem 0 2rem ',
                borderLeft: 'solid',
                borderColor: color,
                borderWidth: '6px',
              }}
            >
              <Markdown>
                {resultData.data.resultData[dimension][language]}
              </Markdown>
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default ResultElement
