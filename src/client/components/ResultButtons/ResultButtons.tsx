import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SendSummaryEmail from '../SendEmail/SendSummaryEmail'
import { InputProps } from '../../types'
import Contact from '../SendEmail/Contact'
import styles from '../../styles'

const ResultButtons = ({ watch }: InputProps) => {
  const { t } = useTranslation()
  const [openContactForm, setOpenContactForm] = useState(false)
  const { formStyles, cardStyles } = styles

  return (
    <Box sx={cardStyles.outerBox}>
      <Box sx={formStyles.stackBoxWrapper}>
        <Stack sx={formStyles.stack} direction="row">
          <SendSummaryEmail watch={watch} />
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

export default ResultButtons
