import React from 'react'
import { useTranslation } from 'react-i18next'
import { Locales, RecommendationLabel, Result } from '@backend/types'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import colors from '../../util/colors'
import Markdown from '../Common/Markdown'

const { cardStyles } = styles

const CommonResult = ({
  language,
  resultData,
  recommendation,
}: {
  language: keyof Locales
  resultData: Result
  recommendation: RecommendationLabel
}) => {
  const { t } = useTranslation()

  if (!resultData || !recommendation) return null

  const recommendationResult = resultData.data.resultData[recommendation]

  if (!recommendationResult) return null

  return (
    <Box>
      <Typography variant='h6' sx={cardStyles.heading} component='div'>
        {t('contact:title')}
      </Typography>
      <Box style={{ margin: '2rem 0 2rem 0' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>

      <Box
        style={{
          margin: 0,
        }}
      >
        <Box
          data-cy={`result-wrapper-${resultData.optionLabel}-${recommendation}`}
          key={`${JSON.stringify(resultData)}.${recommendation}`}
          style={{
            padding: '0 2rem 0 2rem ',
            borderLeft: 'solid',
            borderColor: colors[recommendation],
            borderWidth: '6px',
          }}
        >
          <Markdown>{recommendationResult[language]}</Markdown>
        </Box>
      </Box>
    </Box>
  )
}

export default CommonResult
