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
  if (!resultData || !dimensions || !resultData) return null

  return (
    <Container
      style={{
        margin: '0 0 3rem 0',
      }}
    >
      <Box style={{ margin: '1rem' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>

      <Box style={{ margin: '1rem 0 0 0' }}>
        {dimensions.map((dimension) => {
          const color = colors[dimension] ?? undefined
          const recommendationResult = resultData?.data?.resultData[dimension]

          if (!recommendationResult) return null

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
              <Markdown>{recommendationResult[language]}</Markdown>
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default ResultElement
