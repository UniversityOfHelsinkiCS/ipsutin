import { Alert, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

const FirstStepIntroText = () => (
  <>
    <Typography variant='body1'>
      {t('inventorsAssistant:step1MainContent')}
    </Typography>
    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:step1Disclaimer')}
    </Typography>

    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:header2')}
    </SectionHeading>

    <Alert severity='info' sx={{ mt: 2 }}>
      {t('inventorsAssistant:h2text1')}
    </Alert>
  </>
)

export default FirstStepIntroText
