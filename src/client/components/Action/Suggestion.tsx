import React from 'react'
import { Box } from '@mui/material'

interface SuggestionProps {
  title?: string
  content?: string
  children: React.ReactNode
}

const Suggestion = ({ title, content, children }: SuggestionProps) => (
  <Box>{children}</Box>
)

export default Suggestion
