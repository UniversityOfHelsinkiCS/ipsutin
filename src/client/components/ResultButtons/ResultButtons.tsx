import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import SendSummaryEmail from '../SendEmail/SendSummaryEmail'
import Contact from '../SendEmail/Contact'

import styles from '../../styles'

const ResultButtons = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles

  return (
    <Box sx={cardStyles.subHeading}>
      <Typography variant='body1'>
        {t('results:proceedEmailInfoText')}
      </Typography>

      <SendSummaryEmail />
      <Contact />
    </Box>
  )
}

export default ResultButtons
