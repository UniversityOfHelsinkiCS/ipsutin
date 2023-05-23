import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'
import Markdown from '../Common/Markdown'

const Tools = () => {
  const { t } = useTranslation()

  const { recommendationStyles, cardStyles } = styles
  return (
    <Box sx={recommendationStyles.recommendationContainer}>
      <Typography
        data-cy="recommendation-section-title"
        variant="h5"
        sx={cardStyles.heading}
        component="span"
      >
        {t('sideBarServices:services')}
      </Typography>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:inventionDisclosure')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:ideaClinic')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:incubator')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:businessCollaborationTeam')}</Markdown>
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        <Markdown>{t('sideBarServices:lawyers')}</Markdown>
      </Box>
    </Box>
  )
}

export default Tools
