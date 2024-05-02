import { Dispatch, SetStateAction } from 'react'
import { List, ListItemText, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'

import LlmResponse from './LlmResponse'

type FourthStepProps = {
  setAiResponse3: Dispatch<SetStateAction<string>>
  aiResponse: string
}

const FourthStep = ({ setAiResponse3, aiResponse }: FourthStepProps) => (
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

    <LlmResponse aiResponse={aiResponse} setEditedResponse={setAiResponse3} />
  </>
)

export default FourthStep
