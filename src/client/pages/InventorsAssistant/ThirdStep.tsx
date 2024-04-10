import React from 'react'
import { Box, TextField } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
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
    <SectionHeading level='h2'>
      {t('inventorsAssistant:step3Header1')}
    </SectionHeading>
    <Markdown>{t('inventorsAssistant:step3text1')}</Markdown>
    <Box sx={{ pl: 4, margin: 4 }}>
      <Markdown>{t('inventorsAssistant:step3Header2')}</Markdown>

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
