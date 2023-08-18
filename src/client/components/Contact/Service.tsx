import React, { ReactNode } from 'react'
import { Box, SxProps, Theme } from '@mui/material'

import Markdown from '../Common/Markdown'

interface ServiceProps {
  title: string
  content: string
  children?: ReactNode
  sx?: SxProps<Theme>
}

const Service = ({ title, content, children, sx }: ServiceProps) => (
  <Box sx={sx}>
    <Box sx={{ mb: 1 }}>
      <Markdown>{title}</Markdown>
    </Box>
    <Markdown>{content}</Markdown>
    <Box sx={{ mt: 2 }}>{children}</Box>
  </Box>
)

export default Service
