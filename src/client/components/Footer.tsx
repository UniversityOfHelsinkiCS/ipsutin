import React from 'react'
import { Box, Link } from '@mui/material'
import styles from '../styles'

import toskaColor from '../assets/toscalogo_color.svg'

const Footer = () => {
  const { footerStyles } = styles

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.toskaDark.main,
        color: theme.palette.toskaDark.contrastText,
      })}
    >
      <Box sx={footerStyles.supportBox}>
        <Box>
          <Link
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            <img
              alt="Creative Commons license"
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
            />
          </Link>
          <Link
            sx={{ ml: 1 }}
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          />
        </Box>

        <Box sx={footerStyles.imageBox}>
          <Link
            href="https://toska.dev"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            <img src={toskaColor} alt="Toska" width="70" />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
