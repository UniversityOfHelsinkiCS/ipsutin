import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Button, Typography } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'

interface StepZeroProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const StepZero: React.FC<StepZeroProps> = ({ currentStep, setCurrentStep }) => {
  const { t } = useTranslation()
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Box
      component='section'
      sx={{ maxWidth: '1024px', mx: 'auto', my: 8, p: { xs: 2, md: 0 } }}
    >
      <SectionHeading level='h2'>
        {t('inventorsAssistant:mainSubHeading')}
      </SectionHeading>
      <Typography component='p' variant='body1'>
        {t('inventorsAssistant:mainContent')}
      </Typography>
      <Box
        component='section'
        sx={{ maxWidth: '1024px', mx: 'auto', my: 4, p: { xs: 2, md: 0 } }}
      >
        <Alert severity='info'>
          <Typography component='p' variant='body1' sx={{ fontWeight: 'bold' }}>
            {t('inventorsAssistant:ImportantInfoUserInput')}
          </Typography>
          <Typography
            variant='body2'
            onClick={() => setShowDetails(!showDetails)}
            sx={{
              cursor: 'pointer',
              color: 'text.secondary',
              mt: 2,
              mb: showDetails ? 2 : 0,
              textDecoration: showDetails ? 'underline' : 'none',
            }}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Typography>

          {showDetails && (
            <Typography component='p' variant='body1'>
              {t('inventorsAssistant:ImportantInfoUserInputLong')}
            </Typography>
          )}
        </Alert>
      </Box>

      {currentStep === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              mx: 'auto',
              px: 12,
              my: 4,
              borderRadius: '1rem',
              textTransform: 'capitalize',
              fontWeight: '600',
              fontSize: '12pt',
            }}
            type='button'
            variant='contained'
            color='secondary'
            onClick={() => setCurrentStep(1)}
          >
            {t('inventorsAssistant:start')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default StepZero
