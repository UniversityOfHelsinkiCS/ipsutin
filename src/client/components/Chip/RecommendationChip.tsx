import React from 'react'
import { Chip, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Locales, Recommendation } from '@backend/types'

import colors from '../../util/colors'

const RecommendationChip: React.FC<{
  recommendation: Recommendation
  compact: boolean
}> = ({ recommendation, compact = false }) => {
  const style = {
    backgroundColor: colors[recommendation.label],
    marginX: '0.1rem',
    fontWeight: 'normal',
    color: 'white',
  }
  const { i18n } = useTranslation()
  const { language } = i18n

  return compact ? (
    <Tooltip title={recommendation.title[language as keyof Locales]} arrow>
      <Chip
        data-cy={`recommendation-chip-${recommendation.id}`}
        label={recommendation.title[language as keyof Locales].substring(0, 3)}
        size='small'
        sx={style}
      />
    </Tooltip>
  ) : (
    <Chip
      label={recommendation.title[language as keyof Locales]}
      size='small'
      sx={style}
    />
  )
}

export default RecommendationChip
