import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { SurveyName } from '../../types'

interface ExtraActionProps {
  surveyName: SurveyName
}

const ExtraAction = ({ surveyName }: ExtraActionProps) => {
  const { t } = useTranslation()

  const components: { [key in SurveyName]?: ReactElement } = {}

  const ExtraActionComponent = components[surveyName]

  if (!ExtraActionComponent) return null

  return <Box sx={{ mt: 8 }}>{ExtraActionComponent}</Box>
}

export default ExtraAction
