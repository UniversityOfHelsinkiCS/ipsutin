import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import SectionHeading from '../Common/SectionHeading'

interface BaseErrorProps {
  errorHeading: string
  errorDetails: string
}

const BaseError = ({ errorHeading, errorDetails }: BaseErrorProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      component='section'
      sx={{
        p: { xs: 2, sm: 4, md: 8, lg: 12 },
        minHeight: '100vh',
      }}
    >
      <SectionHeading level='h1'>{errorHeading}</SectionHeading>
      <Typography component='p' variant='body1'>
        {errorDetails}
      </Typography>
      <Button
        sx={{ mt: 4, borderRadius: '0.5rem' }}
        variant='contained'
        onClick={() => navigate('/')}
      >
        {t('common:navigateHome')}
      </Button>
    </Box>
  )
}

export default BaseError
