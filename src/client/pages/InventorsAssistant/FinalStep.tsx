import { Alert, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmResponse from './LlmResponse'

type FinalStepProps = {
  aiResponse: string
  originalIdea: string
  ideaRefinement: string
  industrialApplicability: string
  claims: string
}

const FinalStep = ({
  aiResponse,
  originalIdea,
  ideaRefinement,
  industrialApplicability,
  claims,
}: FinalStepProps) => (
  <>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:finalStepHeader1')}
    </SectionHeading>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepText1')}
    </Typography>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepOriginalIdea')}
    </Typography>

    <Alert severity='success' sx={{ my: 4, p: 4 }}>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {originalIdea}
      </Typography>
    </Alert>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepRefinedIdea')}
    </Typography>
    <Alert severity='success' sx={{ my: 4, p: 4 }}>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {ideaRefinement}
      </Typography>
    </Alert>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepIndustrialApplicability')}
    </Typography>
    <Alert severity='success' sx={{ my: 4, p: 4 }}>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {industrialApplicability}
      </Typography>
    </Alert>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepClaims')}
    </Typography>
    <Alert severity='success' sx={{ my: 4, p: 4 }}>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {claims}
      </Typography>
    </Alert>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepSummary')}
    </Typography>
    <LlmResponse aiResponse={aiResponse} />
  </>
)

export default FinalStep
