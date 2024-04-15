import React from 'react'
import {
  IPAssessmentResult,
  Locales,
  RecommendationLabel,
} from '@backend/types'
import { Box, List, ListItem } from '@mui/material'
import { ResultWithLabels } from 'src/client/types'

import { recommendations } from '../../util/services'
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
    <Box
      component='section'
      style={{
        margin: '0 0 3rem 0',
      }}
    >
      <Markdown>{resultData.isSelected[language]}</Markdown>

      <List style={{ margin: '1rem 0 0 0' }}>
        {dimensions.map((dimension) => {
          const serviceRecommendation = recommendations.find(
            (s) => s.id === dimension
          )
          const serviceColor = serviceRecommendation?.colors.background
          const recommendationResult = resultData?.data?.resultData[dimension]

          if (!recommendationResult || !recommendationResult[language])
            return null

          return (
            <ListItem
              data-cy={`result-wrapper-${resultData.optionLabel}-${dimension}`}
              aria-label={`Suggestion for ${dimension}: ${recommendationResult[language]}`}
              key={`${JSON.stringify(resultData)}.${dimension}`}
              style={{
                margin: '1rem 0 0 0',
                padding: '0 2rem 0 2rem ',
                borderLeft: 'solid',
                borderColor: serviceColor,
                borderWidth: '6px',
              }}
            >
              <Markdown>{recommendationResult[language]}</Markdown>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default ResultElement
