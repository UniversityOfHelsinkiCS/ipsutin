import React from 'react'
import {
  Alert,
  Box,
  List,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { t } from 'i18next'

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

    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h3' sx={{ mt: 2 }}>
        {t('inventorsAssistant:inventiveStepHeader')}
      </SectionHeading>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:inventiveStepDescription')}
      </Typography>
      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:describeGeneralIdea')}
      </Typography>

      <List sx={{ pl: 2 }}>
        <ListItemText>{t('inventorsAssistant:problem')}</ListItemText>
        <ListItemText>{t('inventorsAssistant:invention')}</ListItemText>
        <ListItemText>{t('inventorsAssistant:applications')}</ListItemText>
      </List>

      <TextField
        fullWidth
        multiline
        minRows={5}
        value={inventiveMessage}
        onChange={(e) => setInventiveMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
    </Box>

    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h3'>
        {t('inventorsAssistant:publicityStepHeader')}
      </SectionHeading>
      <Typography variant='body1' sx={{ my: 2 }}>
        {t('inventorsAssistant:publicityStepDescription')}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={publicityMessage}
        onChange={(e) => setPublicityMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
    </Box>

    <Box component='section' sx={{ mt: 4 }}>
      <SectionHeading level='h3'>
        {t('inventorsAssistant:industrialStepHeader')}
      </SectionHeading>
      <Typography variant='body1' sx={{ my: 2 }}>
        {t('inventorsAssistant:industrialDescription')}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={industrialMessage}
        onChange={(e) => setIndustrialMessage(e.target.value)}
        placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
      />
    </Box>
  </>
)

export default FirstStep
