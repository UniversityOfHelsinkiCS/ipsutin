import { Dispatch, SetStateAction } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
import useResultRefCallback from '../../hooks/useResultRefCallback'

import LlmResponse from './LlmResponse'

type FinalStepProps = {
  aiResponse: string
  originalIdea: string
  ideaRefinement: string
  industrialApplicability: string
  claims: string
  setAiResponse4: Dispatch<SetStateAction<string>>
}

const FinalStep = ({
  aiResponse,
  originalIdea,
  ideaRefinement,
  industrialApplicability,
  claims,
  setAiResponse4,
}: FinalStepProps) => {
  const refCallback = useResultRefCallback()

  return (
    <Box ref={refCallback}>
      <SectionHeading level='h2' sx={{ mt: 8 }}>
        {t('inventorsAssistant:finalStepHeader1')}
      </SectionHeading>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepText1')}
      </Typography>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepSummary')}
      </Typography>

      <LlmResponse aiResponse={aiResponse} setEditedResponse={setAiResponse4} />

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepOriginalIdea')}
      </Typography>

      <Alert severity='success' sx={{ my: 4, p: 4 }}>
        <Markdown>{originalIdea}</Markdown>
      </Alert>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepRefinedIdea')}
      </Typography>
      <Alert severity='success' sx={{ my: 4, p: 4 }}>
        <Markdown>{ideaRefinement}</Markdown>
      </Alert>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepIndustrialApplicability')}
      </Typography>
      <Alert severity='success' sx={{ my: 4, p: 4 }}>
        <Markdown>{industrialApplicability}</Markdown>
      </Alert>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepClaims')}
      </Typography>
      <Alert severity='success' sx={{ my: 4, p: 4 }}>
        <Markdown>{claims}</Markdown>
      </Alert>
    </Box>
  )
}

export default FinalStep
