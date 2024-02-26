import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@mui/material'

import Markdown from '../../components/Common/Markdown'
import styles from '../../styles'

const IntroCard = () => {
  const { t } = useTranslation()
  const { cardStyles } = styles

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
      <CardContent sx={cardStyles.expendableBox}>
        <Markdown>{t('helloBanner:title')}</Markdown>
        <Markdown>{t('helloBanner:text')}</Markdown>
      </CardContent>
    </Card>
  )
}

export default IntroCard
