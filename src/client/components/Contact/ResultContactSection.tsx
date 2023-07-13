import React from 'react'
import { Box } from '@mui/material'

import SendSummaryEmail from './SendSummaryEmail'
import Contact from './Contact'

import styles from '../../styles'

import { RecommendationLabel } from '../../types'

interface ContactAction {
  contactAction?: RecommendationLabel
}

const ResultContactSection = ({ contactAction }: ContactAction) => {
  const { cardStyles } = styles

  return (
    <Box sx={cardStyles.subHeading}>
      <SendSummaryEmail />
      <Contact action={contactAction} />
    </Box>
  )
}

export default ResultContactSection
