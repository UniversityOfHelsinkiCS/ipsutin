import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import SendContactTicket from './SendContactTicket'

const Contact = ({ action = 'clinic' }) => {
  const { t } = useTranslation()

  const components: { [key: string]: ReactElement } = {
    clinic: (
      <SendContactTicket
        title={t('contact:hisTitle')}
        content={t('contact:hisContent')}
        ticketEmail='his@helsinki.fi'
      />
    ),
    legal: (
      <SendContactTicket
        title={t('contact:legalTitle')}
        content={t('contact:legalContent')}
        ticketEmail='legal@helsinki.fi'
      />
    ),
  }

  const ContactComponent = components[action]

  if (!ContactComponent) return null

  return <Box sx={{ mt: 8 }}>{ContactComponent}</Box>
}

export default Contact
