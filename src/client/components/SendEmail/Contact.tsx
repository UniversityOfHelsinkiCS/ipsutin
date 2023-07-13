import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import SendContactTicket from './SendContactTicket'
import Markdown from '../Common/Markdown'

import styles from '../../styles'

const Contact = ({ method = 'clinic' }) => {
  const { t } = useTranslation()

  const { cardStyles } = styles

  const components: { [key: string]: ReactElement<any, any> } = {
    clinic: <SendContactTicket ticketEmail='his@helsinki.fi' />,
    legal: <SendContactTicket ticketEmail='legal@helsinki.fi' />,
  }

  const ContactComponent = components[method]

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

        {ContactComponent}
      </Container>
    </Box>
  )
}

export default Contact
