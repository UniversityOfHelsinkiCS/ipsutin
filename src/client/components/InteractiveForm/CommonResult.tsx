import React from 'react'

import { Box } from '@mui/material'

import { Locales, RecommendationLabel, Result } from '@backend/types'

import Markdown from '../Common/Markdown'

import colors from '../../util/colors'

const CommonResult = ({
  language,
  resultData,
  recommendation,
}: {
  language: keyof Locales
  resultData: Result
  recommendation: RecommendationLabel
}) => {
  if (!resultData || !recommendation) return null

  return (
    <Box>
      <Box style={{ margin: '2rem 0 2rem 0' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>

      <Box
        style={{
          margin: '2rem 0 2rem 0',
        }}
      >
        <Box
          data-cy={`result-wrapper-${resultData.optionLabel}-${recommendation}`}
          key={`${JSON.stringify(resultData)}.${recommendation}`}
          style={{
            margin: '0 0 4rem 0',
            padding: '0 2rem 0 2rem ',
            borderLeft: 'solid',
            borderColor: colors[recommendation],
            borderWidth: '6px',
          }}
        >
          <Markdown>
            {resultData.data.resultData[recommendation][language]}
          </Markdown>
        </Box>
      </Box>
    </Box>
  )
}

export default CommonResult
