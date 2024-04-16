import React from 'react'
import { List, ListItemText, TextField, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

type FourthStepProps = {
  refinementMessage: string
  setRefinementMessage: React.Dispatch<React.SetStateAction<string>>
}

const FourthStep = ({
  refinementMessage,
  setRefinementMessage,
}: FourthStepProps) => (
  <>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:step4Header1')}
    </SectionHeading>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:step4text1')}
    </Typography>
    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:step4text2')}
    </Typography>

    <List sx={{ pl: 2 }}>
      <ListItemText>{t('inventorsAssistant:step4Bullet1')}</ListItemText>
      <ListItemText>{t('inventorsAssistant:step4Bullet2')}</ListItemText>
      <ListItemText>{t('inventorsAssistant:step4Bullet3')}</ListItemText>
      <ListItemText>{t('inventorsAssistant:step4Bullet4')}</ListItemText>
      <ListItemText>{t('inventorsAssistant:step4Bullet5')}</ListItemText>
      <ListItemText>{t('inventorsAssistant:step4Bullet6')}</ListItemText>
      <ListItemText>{t('inventorsAssistant:step4Bullet7')}</ListItemText>
    </List>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:step4text3')}
    </Typography>

    <Typography variant='body1' sx={{ my: 2 }}>
      {t('inventorsAssistant:step4text4')}
    </Typography>

    <TextField
      fullWidth
      multiline
      minRows={5}
      value={refinementMessage}
      onChange={(e) => setRefinementMessage(e.target.value)}
      placeholder={t('inventorsAssistant:chatBoxPlaceholder')}
    />
  </>
)

export default FourthStep
