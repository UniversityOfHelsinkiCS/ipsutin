import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import Markdown from '../../components/Common/Markdown'
import ShowMore from '../../components/Common/ShowMore'
import styles from '../../styles'

const HelloBanner = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles
  return (
    <Box id='hello-component' sx={cardStyles.helloBox}>
      <Box sx={cardStyles.expendableBox}>
        <Markdown>{t('helloBanner:title')}</Markdown>
        <ShowMore text={t('helloBanner:description')} expanded={false} />
        <Markdown>{t('helloBanner:text')}</Markdown>
      </Box>
    </Box>
  )
}

export default HelloBanner
