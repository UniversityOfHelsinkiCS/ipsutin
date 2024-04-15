import { Box, Link } from '@mui/material'

import toskaColor from '../assets/toscalogo_color.svg'

const Footer = () => (
  <Box
    component='footer'
    sx={(theme) => ({
      backgroundColor: theme.palette.toskaDark.main,
      color: theme.palette.toskaDark.contrastText,
      px: '3rem',
      py: '2rem',
    })}
  >
    <Link
      href='https://toska.dev'
      target='_blank'
      rel='noopener'
      underline='hover'
    >
      <img src={toskaColor} alt='Toska' width='100px' />
    </Link>
  </Box>
)

export default Footer
