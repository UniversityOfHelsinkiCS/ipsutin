import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'
import styles from '../../styles'
import SendContactTicket from './SendContactTicket'

const Contact = () => {
  const { t } = useTranslation()
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [contactMethod, setContactMethod] = useState('email')

  const { cardStyles, formStyles } = styles

  const components: { [key: string]: () => JSX.Element } = {
    email: SendContactTicket,
  }

  const ContactComponent = components[contactMethod]

  if (!ContactComponent) return null

  return (
    <Box>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h5" sx={cardStyles.heading} component="div">
          {t('contact:title')}
        </Typography>
        <Typography sx={cardStyles.content} variant="body2">
          {t('contact:contactMessage')}
        </Typography>

        <ContactComponent />
      </Container>
    </Box>
  )
}

export default Contact
