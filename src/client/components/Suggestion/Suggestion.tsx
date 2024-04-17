import React from 'react'
import { Box } from '@mui/material'

interface SuggestionProps {
  children: React.ReactNode
}

const Suggestion = ({ children }: SuggestionProps) => <Box>{children}</Box>

export default Suggestion
