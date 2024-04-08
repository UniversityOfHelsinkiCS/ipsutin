import React from 'react'
import { Locales, RecommendationLabel, Result } from '@backend/types'
import { Box } from '@mui/material'

import { recommendations } from '../../util/services'
import Markdown from '../Common/Markdown'

const CommonResult = ({
  language,
  resultData,
  recommendation,
}: {
  language: keyof Locales
  resultData: Result | undefined
  recommendation: RecommendationLabel
}) => {
  if (!resultData || !recommendation) return null

  const recommendationResult = resultData.data.resultData[recommendation]

  if (!recommendationResult) return null

  const serviceRecommendation = recommendations.find(
    (s) => s.id === recommendation
  )
  const serviceColor = serviceRecommendation?.colors.background

  return (
    <Box
      data-cy={`result-wrapper-${resultData.optionLabel}-${recommendation}`}
      key={`${JSON.stringify(resultData)}.${recommendation}`}
      style={{
        padding: '0 2rem 0 2rem ',
        borderLeft: 'solid',
        borderColor: serviceColor,
        borderWidth: '6px',
      }}
    >
      <Markdown>{recommendationResult[language]}</Markdown>
    </Box>
  )
}

export default CommonResult
