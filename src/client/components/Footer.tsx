import React from 'react'
import { Box, Link } from '@mui/material'

import toskaColor from '../assets/toscalogo_color.svg'
import styles from '../styles'

const Footer = () => {
  const { footerStyles } = styles

  return (
    <Box
      component='footer'
      sx={(theme) => ({
        backgroundColor: theme.palette.toskaDark.main,
        color: theme.palette.toskaDark.contrastText,
      })}
    >
      <Box sx={footerStyles.supportBox}>
        <Box sx={footerStyles.imageBox}>
          <Link
            href='https://toska.dev'
            target='_blank'
            rel='noopener'
            underline='hover'
          >
            <img src={toskaColor} alt='Toska' width='70' />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
