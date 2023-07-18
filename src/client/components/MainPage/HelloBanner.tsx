import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import styles from '../../styles'
import Markdown from '../Common/Markdown'
import ShowMore from '../Common/ShowMore'

const HelloBanner = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles
  return (
    <Box id='hello-component' sx={cardStyles.helloBox}>
      <Box sx={cardStyles.expendableBox}>
        <Markdown>{t('helloBanner:title')}</Markdown>
        <ShowMore text={t('helloBanner:description')} expanded />
      </Box>
    </Box>
  )
}

export default HelloBanner
