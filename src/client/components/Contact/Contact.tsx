import React, { ReactElement } from 'react'
import { Box } from '@mui/material'

import SendContactTicket from './SendContactTicket'

const Contact = ({ method = 'clinic' }) => {
  const components: { [key: string]: ReactElement<any, any> } = {
    clinic: <SendContactTicket ticketEmail='his@helsinki.fi' />,
    legal: <SendContactTicket ticketEmail='legal@helsinki.fi' />,
  }

  const ContactComponent = components[method]

  if (!ContactComponent) return null

  return <Box sx={{ mt: 8 }}>{ContactComponent}</Box>
}

export default Contact
