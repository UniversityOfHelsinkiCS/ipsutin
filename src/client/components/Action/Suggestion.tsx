import React from 'react'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import Markdown from '../Common/Markdown'

interface SuggestionProps {
  title?: string
  content?: string
  children: React.ReactNode
}

const { cardStyles } = styles

const Suggestion = ({ title, content, children }: SuggestionProps) => (
  <Box>{children}</Box>
)

export default Suggestion
