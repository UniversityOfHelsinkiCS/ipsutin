import React from 'react'
import { Box, Typography } from '@mui/material'

import Markdown from '../Common/Markdown'

import styles from '../../styles'

interface ServiceProps {
  title: string
  content: string
}

const { cardStyles } = styles

const Service = ({ title, content }: ServiceProps) => (
  <Box>
    <Typography variant='h6' sx={cardStyles.heading} component='div'>
      {title}
    </Typography>
    <Markdown sx={cardStyles.content} variant='body2'>
      {content}
    </Markdown>
  </Box>
)

export default Service
