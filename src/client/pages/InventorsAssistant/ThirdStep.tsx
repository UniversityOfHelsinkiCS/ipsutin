import React, { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import ErrorAlert from './ErrorAlert'
import LlmResponse from './LlmResponse'

type ThirdStepProps = {
  current: boolean
  setAiResponse2: React.Dispatch<React.SetStateAction<string>>
  aiResponse: string
  aiResponseReady: boolean
  setEditModeGlobal: Dispatch<SetStateAction<boolean>>
  aiResponseError: string | null
  handleTryAgain: () => void
}

const ThirdStep: React.FC<ThirdStepProps> = ({
  current,
  setAiResponse2,
  aiResponse,
  aiResponseReady,
  setEditModeGlobal,
  aiResponseError,
  handleTryAgain,
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
      {aiResponseError ? (
        <ErrorAlert
          error={aiResponseError}
          handleTryAgain={() => handleTryAgain()}
        />
      ) : (
        <LlmResponse
          current={current}
          aiResponse={aiResponse}
          aiResponseReady={aiResponseReady}
          setEditedResponse={setAiResponse2}
          setEditModeGlobal={setEditModeGlobal}
        />
      )}
    </Box>
  </>
)

export default ThirdStep
