import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

import illustration from '../../assets/inventors_assistant_illustration.jpg'
import SectionHeading from '../../components/Common/SectionHeading'

interface StepZeroProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const StepZero: React.FC<StepZeroProps> = ({ currentStep, setCurrentStep }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box component='section' sx={{ position: 'relative', width: '100vw' }}>
        <img
          aria-hidden
          alt=''
          loading='lazy'
          src={illustration}
          width='100%'
          style={{ aspectRatio: '16/9', maxHeight: '1480px' }}
        />
        <Typography
          component='h1'
          sx={{
            position: 'absolute',
            top: { xs: '40%', sm: '60%' },
            left: '40%',
            paddingRight: { xs: '1rem', sm: '2rem', md: '4rem' },
            color: '#fff',
            backgroundColor: 'fff',
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            fontSize: {
              xs: '26pt',
              sm: '32pt',
              md: '38pt',
              lg: '46pt',
              xl: '52pt',
            },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {t('inventorsAssistant:mainHeading')}
        </Typography>
      </Box>

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
    </>
  )
}

export default StepZero
