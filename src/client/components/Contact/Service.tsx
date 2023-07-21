import React from 'react'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import Markdown from '../Common/Markdown'

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
    <Markdown>{content}</Markdown>
  </Box>
)

export default Service
