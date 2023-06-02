import React from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Markdown from '../Common/Markdown'
import ShowMore from '../Common/ShowMore'

import styles from '../../styles'

const HelloBanner = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles
  return (
    <Box id="hello-component" sx={cardStyles.helloBox}>
      <Box sx={cardStyles.expendableBox}>
        <Markdown>{t('helloBanner:title')}</Markdown>
        <ShowMore text={t('helloBanner:description')} expanded />
      </Box>
    </Box>
  )
}

export default HelloBanner
