import React from 'react'
import { useTranslation } from 'react-i18next'
import { Locales, Recommendation } from '@backend/types'
import { Chip, getContrastRatio, Tooltip } from '@mui/material'

import services from '../../util/services'

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

  const service = services.find((s) => s.id === recommendation.label)
  const serviceColor = service?.colors.background || '#000'

  const style = {
    backgroundColor: serviceColor,
    marginX: '0.1rem',
    fontWeight: 'normal',
    color: getContrastRatio(serviceColor, '#fff') > 4.5 ? '#fff' : '#000',
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
