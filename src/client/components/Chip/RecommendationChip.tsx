import React from 'react'
import { useTranslation } from 'react-i18next'
import { Locales, Recommendation } from '@backend/types'
import { Chip, Tooltip } from '@mui/material'

import colors from '../../util/colors'

interface RecommendationChipProps {
  recommendation: Recommendation
  compact: boolean
}

const RecommendationChip = ({
  recommendation,
  compact = false,
}: RecommendationChipProps) => {
  const { i18n } = useTranslation()
  const { language } = i18n

  const style = {
    backgroundColor:
      colors[recommendation.label as keyof typeof colors]?.background,
    marginX: '0.1rem',
    fontWeight: 'normal',
    color: colors[recommendation.label as keyof typeof colors]?.text,
  }

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
