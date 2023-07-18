import React from 'react'
import { Box, Typography } from '@mui/material'

import Markdown from '../Common/Markdown'

import styles from '../../styles'

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
