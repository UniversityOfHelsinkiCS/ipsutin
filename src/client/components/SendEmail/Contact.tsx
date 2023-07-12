import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import SendContactTicket from './SendContactTicket'
import Markdown from '../Common/Markdown'

import styles from '../../styles'

const Contact = ({ method = 'email' }) => {
  const { t } = useTranslation()
  const [contactMethod, setContactMethod] = useState(method)

  const { cardStyles } = styles

  const components: { [key: string]: () => JSX.Element } = {
    email: SendContactTicket,
  }

  const ContactComponent = components[contactMethod]

  if (!ContactComponent) return null

  return (
    <Box>
      <Container sx={{ mt: 8 }}>
        <Typography variant='h6' sx={cardStyles.heading} component='div'>
          {t('contact:title')}
        </Typography>
        <Markdown sx={cardStyles.content} variant='body2'>
          {t('contact:contactMessage')}
        </Markdown>

        <ContactComponent />
      </Container>
    </Box>
  )
}

export default Contact
