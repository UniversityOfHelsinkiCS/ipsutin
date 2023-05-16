import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SendSummaryEmail from '../SendEmail/SendSummaryEmail'
import { InputProps } from '../../types'
import Contact from '../SendEmail/Contact'
import styles from '../../styles'

const Results = ({ watch }: InputProps) => {
  const { t } = useTranslation()
  const [openContactForm, setOpenContactForm] = useState(false)
  const { formStyles } = styles

  console.log(watch)

  return (
    <Box>
      <Box>Results</Box>
      <Box sx={formStyles.stackBoxWrapper}>
        <Stack sx={formStyles.stack} direction="row">
          <SendSummaryEmail />
          <Button
            sx={formStyles.stackButton}
            variant="contained"
            color="primary"
            onClick={
              openContactForm
                ? () => setOpenContactForm(false)
                : () => setOpenContactForm(true)
            }
          >
            {t('contact:submit')}
          </Button>
        </Stack>
      </Box>
      {openContactForm && <Contact />}
    </Box>
  )
}

export default Results
