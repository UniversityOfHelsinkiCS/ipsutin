import React from 'react'
import { Container, Typography } from '@mui/material'

import placeholder from '../../assets/placeholder.png'

const WelcomeView = () => {
  const header = 'Ai is the best... when it works'
  const subText = 'Ai works for almost everything, but almost never'
  return (
    <Container maxWidth='md'>
      <img src={placeholder} alt='Welcome' />
      <Typography variant='h1'>{header}</Typography>
      <Typography variant='body1'>{subText}</Typography>
    </Container>
  )
}
export default WelcomeView
