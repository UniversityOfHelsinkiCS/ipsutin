import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'

const ResetForm = () => {
  const { t } = useTranslation()

  const resetForm = () => {
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <Button
      sx={{
        textTransform: 'Capitalize',
        fontWeight: '600',
        fontSize: '12pt',
      }}
      type='reset'
      data-cy='reset-form-button'
      onClick={resetForm}
      color='error'
    >
      {t('reset')}
    </Button>
  )
}

export default ResetForm
