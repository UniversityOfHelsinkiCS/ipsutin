import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { RecommendationLabel } from '../../types'

interface Action {
  action: RecommendationLabel
}

const Contact = ({ action }: Action) => {
  const { t } = useTranslation()

  const components: { [key in RecommendationLabel]?: ReactElement } = {
    gnu_gpl: <>asdf</>,
  }

  const ExtraActionComponent = components[action]

  if (!ExtraActionComponent) return null

  return <Box sx={{ mt: 8 }}>{ExtraActionComponent}</Box>
}

export default Contact
