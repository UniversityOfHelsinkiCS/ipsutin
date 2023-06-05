import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack, Typography } from '@mui/material'

import SendSummaryEmail from '../SendEmail/SendSummaryEmail'
import Contact from '../SendEmail/Contact'

import styles from '../../styles'

const ResultButtons = () => {
  const { t } = useTranslation()
  const [openContactForm, setOpenContactForm] = useState(false)
  const { formStyles, cardStyles } = styles

  return (
    <Box sx={cardStyles.subHeading}>
      <Typography variant="body1">
        {t('results:proceedEmailInfoText')}
      </Typography>
      <Box sx={formStyles.stackBoxWrapper}>
        <Stack sx={formStyles.stack} direction="row">
          <SendSummaryEmail />
          <Button
            sx={formStyles.stackButton}
            variant="contained"
            color="primary"
            onClick={() => setOpenContactForm(!openContactForm)}
          >
            {t('contact:submit')}
          </Button>
        </Stack>
      </Box>
      {openContactForm && <Contact />}
    </Box>
  )
}

export default ResultButtons
