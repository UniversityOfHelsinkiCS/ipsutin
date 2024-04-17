import { Alert, Typography } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'

type FinalStepProps = {
  aiResponse2: string
}

const FinalStep = ({ aiResponse2 }: FinalStepProps) => (
  <>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:finalStepHeader1')}
    </SectionHeading>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepText1')}
    </Typography>
    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepSummary')}
    </Typography>
    <Alert severity={aiResponse2 ? 'success' : 'info'} sx={{ my: 4, p: 4 }}>
      <Markdown>
        {aiResponse2 || 'Grunching response for you, please wait...'}
      </Markdown>
    </Alert>
  </>
)

export default FinalStep
