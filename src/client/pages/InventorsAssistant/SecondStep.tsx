import { Dispatch, SetStateAction } from 'react'
import { Box, TextField } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'

const SecondStep: React.FC<{
  refinementMessage: string
  setRefinementMessage: Dispatch<SetStateAction<string>>
  aiResponse: string
}> = ({ refinementMessage, setRefinementMessage, aiResponse }) => (
  <>
    <SectionHeading level='h2'>
      {t('inventorsAssistant:step2Header1')}
    </SectionHeading>

    <Markdown>{t('inventorsAssistant:step2text1')}</Markdown>

    <Box sx={{ pl: 4, margin: 4 }}>
      <Markdown>{`### *${aiResponse || 'Ai response...'}*`}</Markdown>
    </Box>

    <SectionHeading level='h3'>
      {t('inventorsAssistant:step2Header2')}
    </SectionHeading>
    <Markdown>{t('inventorsAssistant:step2text2')}</Markdown>

    <Box sx={{ pl: 4, margin: 4 }}>
      <SectionHeading level='h5'>
        {t('inventorsAssistant:step2text3')}
      </SectionHeading>

      <TextField
        fullWidth
        multiline
        minRows={5}
        value={refinementMessage}
        onChange={(e) => setRefinementMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
    </Box>
    <Markdown>{t('inventorsAssistant:detailReminder')}</Markdown>
  </>
)

export default SecondStep
