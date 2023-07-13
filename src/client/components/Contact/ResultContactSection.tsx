import React from 'react'
import { Box } from '@mui/material'

import SendSummaryEmail from './SendSummaryEmail'
import Contact from './Contact'

import styles from '../../styles'

const ResultContactSection = () => {
  const { cardStyles } = styles

  return (
    <Box sx={cardStyles.subHeading}>
      <SendSummaryEmail />
      <Contact />
    </Box>
  )
}

export default ResultContactSection
