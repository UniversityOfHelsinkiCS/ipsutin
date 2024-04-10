import React from 'react'
import { Box, TextField } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'

type FirstStepProps = {
  inventiveMessage: string
  setInventiveMessage: React.Dispatch<React.SetStateAction<string>>
  publicityMessage: string
  setPublicityMessage: React.Dispatch<React.SetStateAction<string>>
  industrialMessage: string
  setIndustrialMessage: React.Dispatch<React.SetStateAction<string>>
}

const FirstStep: React.FC<FirstStepProps> = ({
  inventiveMessage,
  setInventiveMessage,
  publicityMessage,
  setPublicityMessage,
  industrialMessage,
  setIndustrialMessage,
}) => (
  <>
    <SectionHeading level='h2'>
      {t('inventorsAssistant:header1')}
    </SectionHeading>

    <Markdown>{t('inventorsAssistant:h1text1')}</Markdown>
    <Markdown>{t('inventorsAssistant:h1text2')}</Markdown>

    <SectionHeading level='h3'>
      {t('inventorsAssistant:header2')}
    </SectionHeading>

    <Markdown>{t('inventorsAssistant:h2text1')}</Markdown>

    <Box sx={{ pl: 4, margin: 4 }}>
      <SectionHeading level='h5'>
        {t('inventorsAssistant:inventiveStepHeader')}
      </SectionHeading>

      <Markdown>{t('inventorsAssistant:inventiveStepDescription')}</Markdown>
      <Markdown>{t('inventorsAssistant:describeGeneralIdea')}</Markdown>

      <Box sx={{ pl: 2 }}>
        <Markdown>{t('inventorsAssistant:problem')}</Markdown>
        <Markdown>{t('inventorsAssistant:invention')}</Markdown>
        <Markdown>{t('inventorsAssistant:applications')}</Markdown>
      </Box>

      <TextField
        fullWidth
        multiline
        minRows={5}
        value={inventiveMessage}
        onChange={(e) => setInventiveMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
      <SectionHeading level='h5'>
        {t('inventorsAssistant:publicityStepHeader')}
      </SectionHeading>
      <Markdown>{t('inventorsAssistant:publicityStepDescription')}</Markdown>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={publicityMessage}
        onChange={(e) => setPublicityMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
      <SectionHeading level='h5'>
        {t('inventorsAssistant:industrialStepHeader')}
      </SectionHeading>
      <Markdown>{t('inventorsAssistant:industrialDescription')}</Markdown>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={industrialMessage}
        onChange={(e) => setIndustrialMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
    </Box>
    <Markdown>{t('inventorsAssistant:detailReminder')}</Markdown>
  </>
)

export default FirstStep
