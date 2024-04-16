import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

type ThirdStepProps = {
  refinementMessage: string
  setRefinementMessage: React.Dispatch<React.SetStateAction<string>>
}

const ThirdStep: React.FC<ThirdStepProps> = ({
  refinementMessage,
  setRefinementMessage,
}) => (
  <>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:step3Header1')}
    </SectionHeading>
    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:step3text1')}
    </Typography>

    <Box component='section' sx={{ mt: 4 }}>
      <Typography variant='body1' sx={{ my: 2 }}>
        {t('inventorsAssistant:step3Header2')}
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={5}
        value={refinementMessage}
        onChange={(e) => setRefinementMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
    </Box>
  </>
)

export default ThirdStep
