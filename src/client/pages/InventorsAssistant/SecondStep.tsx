import { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmResponse from './LlmResponse'

type SecondStepProps = {
  current: boolean
  setAiResponse1: Dispatch<SetStateAction<string>>
  aiResponse: string
  aiResponseReady: boolean
  setEditModeGlobal: Dispatch<SetStateAction<boolean>>
}

const SecondStep = ({
  current,
  setAiResponse1,
  aiResponse,
  aiResponseReady,
  setEditModeGlobal,
}: SecondStepProps) => (
  <>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:step2Header1')}
    </SectionHeading>
    <Box component='section' sx={{ mt: 4 }}>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:step2text1')}
      </Typography>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:step2text2')}
      </Typography>
    </Box>

    <LlmResponse
      current={current}
      aiResponse={aiResponse}
      aiResponseReady={aiResponseReady}
      setEditedResponse={setAiResponse1}
      setEditModeGlobal={setEditModeGlobal}
    />
  </>
)

export default SecondStep
