import { Dispatch, SetStateAction } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import InventorResponse from './InventorResponse'

type SecondStepProps = {
  refinementMessage: string
  setRefinementMessage: Dispatch<SetStateAction<string>>
  aiResponse: string
}

const SecondStep = ({
  refinementMessage,
  setRefinementMessage,
  aiResponse,
}: SecondStepProps) => (
  <>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:step2Header1')}
    </SectionHeading>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:step2text1')}
    </Typography>

    <InventorResponse aiResponse={aiResponse} />

    {aiResponse.length > 0 && (
      <Box component='section' sx={{ mt: 4 }}>
        <SectionHeading level='h3'>
          {t('inventorsAssistant:step2Header2')}
        </SectionHeading>
        <Typography variant='body1' sx={{ mt: 2 }}>
          {t('inventorsAssistant:step2text2')}
        </Typography>

        <Typography variant='body1' sx={{ my: 2 }}>
          {t('inventorsAssistant:step2text3')}
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
    )}
  </>
)

export default SecondStep
