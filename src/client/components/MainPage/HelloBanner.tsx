import React from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'

const HelloBanner = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles

  return (
    <Box id="hello-component" sx={cardStyles.helloBox}>
      <Box>
        <h2>{t('helloBanner:welcomeMessage')}</h2>
        <div style={{ fontSize: '1.1rem' }}>Placeholder text</div>
      </Box>
    </Box>
  )
}

export default HelloBanner
