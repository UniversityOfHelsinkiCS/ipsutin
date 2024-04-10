import React from 'react'
import { Box, TextField } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'

type FourthStepProps = {
  refinementMessage: string
  setRefinementMessage: React.Dispatch<React.SetStateAction<string>>
}

const FourthStep: React.FC<FourthStepProps> = ({
  refinementMessage,
  setRefinementMessage,
}) => (
  <>
    <SectionHeading level='h2'>
      {t('inventorsAssistant:step4Header1')}
    </SectionHeading>
    <Markdown>{t('inventorsAssistant:step4text1')}</Markdown>
    <Markdown>{t('inventorsAssistant:step4text2')}</Markdown>
    <Box sx={{ pl: 4, margin: 4 }}>
      <Markdown>{t('inventorsAssistant:step4Bullet1')}</Markdown>
      <Markdown>{t('inventorsAssistant:step4Bullet2')}</Markdown>
      <Markdown>{t('inventorsAssistant:step4Bullet3')}</Markdown>
      <Markdown>{t('inventorsAssistant:step4Bullet4')}</Markdown>
      <Markdown>{t('inventorsAssistant:step4Bullet5')}</Markdown>
      <Markdown>{t('inventorsAssistant:step4Bullet6')}</Markdown>
      <Markdown>{t('inventorsAssistant:step4Bullet7')}</Markdown>
    </Box>
    <Markdown>{t('inventorsAssistant:step4text3')}</Markdown>
    <Box sx={{ pl: 4, margin: 4 }}>
      <Markdown>{t('inventorsAssistant:step4text4')}</Markdown>
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

export default FourthStep
