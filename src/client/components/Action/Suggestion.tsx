import React from 'react'
import { Box, Typography } from '@mui/material'

import Markdown from '../Common/Markdown'

import styles from '../../styles'

interface SuggestionProps {
  title: string
  content: string
  children: React.ReactNode
}

const { cardStyles } = styles

const Suggestion = ({ title, content, children }: SuggestionProps) => (
  <Box>
    <Typography variant='h6' sx={cardStyles.heading} component='div'>
      {title}
    </Typography>
    <Markdown sx={cardStyles.content} variant='body2'>
      {content}
    </Markdown>
    {children}
  </Box>
)

export default Suggestion
