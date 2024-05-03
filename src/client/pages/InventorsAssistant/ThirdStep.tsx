import React from 'react'
import { Box, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmResponse from './LlmResponse'

type ThirdStepProps = {
  setAiResponse2: React.Dispatch<React.SetStateAction<string>>
  aiResponse: string
  setEditModeGlobal: Dispatch<SetStateAction<boolean>>
}

const ThirdStep: React.FC<ThirdStepProps> = ({
  setAiResponse2,
  aiResponse,
  setEditModeGlobal,
}) => (
  <>
    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h2' sx={{ mt: 8 }}>
        {t('inventorsAssistant:step3Header1')}
      </SectionHeading>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:step3text1')}
      </Typography>
    </Box>

    <Box component='section' sx={{ mt: 4 }}>
      <LlmResponse
        aiResponse={aiResponse}
        setEditedResponse={setAiResponse2}
        setEditModeGlobal={setEditModeGlobal}
      />
    </Box>
  </>
)

export default ThirdStep
