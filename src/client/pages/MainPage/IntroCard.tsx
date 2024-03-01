import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, Typography } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

const IntroCard = () => {
  const { t } = useTranslation()

  return (
    <Card
      id='hello-component'
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        height: '100%',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <CardContent>
        <Typography
          component='h1'
          variant='h4'
          sx={{ mb: 4, textTransform: 'uppercase', fontWeight: '600' }}
        >
          {t('helloBanner:title')}
        </Typography>
        <Markdown>{t('helloBanner:text')}</Markdown>
      </CardContent>
    </Card>
  )
}

export default IntroCard
