import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import Markdown from '../Common/Markdown'

const Tools = () => {
  const { t } = useTranslation()

  const { recommendationStyles, cardStyles } = styles
  return (
    <Box sx={recommendationStyles.recommendationContainer}>
      <Typography
        data-cy='recommendation-section-title'
        variant='h5'
        sx={cardStyles.heading}
        component='span'
      >
        {t('sideBarServices:services')}
      </Typography>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:disclosure')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:clinic')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:incubator')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:relations')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:legal')}</Markdown>
      </Box>
    </Box>
  )
}

export default Tools
