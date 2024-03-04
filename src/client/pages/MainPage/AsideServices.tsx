import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import Markdown from '../../components/Common/Markdown'
import styles from '../../styles'

const AsideServices = () => {
  const { t } = useTranslation()

  const { recommendationStyles, cardStyles } = styles
  return (
    <Box sx={recommendationStyles.recommendationContainer} component='aside'>
      <Typography
        data-cy='recommendation-section-title'
        component='h3'
        variant='h5'
        sx={cardStyles.heading}
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

export default AsideServices
