import React, { ReactNode } from 'react'
import { Box } from '@mui/material'

import Markdown from '../Common/Markdown'

interface ServiceProps {
  title: string
  content: string
  children?: ReactNode
}

const Service = ({ title, content, children }: ServiceProps) => (
  <Box>
    <Box sx={{ mb: 1 }}>
      <Markdown>{title}</Markdown>
    </Box>
    <Markdown>{content}</Markdown>
    {children}
  </Box>
)

export default Service
