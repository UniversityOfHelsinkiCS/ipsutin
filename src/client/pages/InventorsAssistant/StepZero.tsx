import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'

interface StepZeroProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const StepZero: React.FC<StepZeroProps> = ({ currentStep, setCurrentStep }) => {
  const { t } = useTranslation()

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
            Start
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default StepZero
