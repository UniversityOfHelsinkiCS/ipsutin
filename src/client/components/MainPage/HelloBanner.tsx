import React from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'
import Markdown from '../Common/Markdown'

const HelloBanner = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles

  return (
    <Box id="hello-component" sx={cardStyles.helloBox}>
      <Box>
        <h2>{t('helloBanner:title')}</h2>
        <Markdown>{t('helloBanner:description')}</Markdown>
      </Box>
    </Box>
  )
}

export default HelloBanner
