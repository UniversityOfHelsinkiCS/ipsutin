import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const NavigateBack = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const onNavigateBack = () => {
    navigate({
      pathname: '..',
      search: location.search,
    })
  }

  return (
    <Button
      data-cy='back-to-survey-button'
      sx={{ ml: 2 }}
      onClick={onNavigateBack}
    >
      {'<'} {t('results:backToMessage')}
    </Button>
  )
}

export default NavigateBack
