import { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmResponse from './LlmResponse'

type SecondStepProps = {
  setAiResponse1: Dispatch<SetStateAction<string>>
  aiResponse: string
}

const SecondStep = ({ setAiResponse1, aiResponse }: SecondStepProps) => (
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

    <LlmResponse aiResponse={aiResponse} setEditedResponse={setAiResponse1} />
  </>
)

export default SecondStep
