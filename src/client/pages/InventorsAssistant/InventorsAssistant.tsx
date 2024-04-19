import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

import illustration from '../../assets/inventors_assistant_illustration.jpg'
import SectionHeading from '../../components/Common/SectionHeading'
import apiClient from '../../util/apiClient'

import FinalStep from './FinalStep'
import FirstStep from './FirstStep'
import FourthStep from './FourthStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

const InventorsAssistant = () => {
  const { t } = useTranslation()

  const [currentStep, setCurrentStep] = useState<number>(0)

  const [inventiveMessage, setInventiveMessage] = useState('')
  const [publicMessage, setPublicMessage] = useState('')
  const [industrialMessage, setIndustrialMessage] = useState('')
  const [aiResponse1, setAiResponse1] = useState('')
  const [ideaRefinement, setIdeaRefinement] = useState('')
  const [industrialRefinement, setIndustrialRefinement] = useState('')
  const [claims, setClaims] = useState('')
  const [aiResponse2, setAiResponse2] = useState('')

  const handleFirstStepMessage = async () => {
    setAiResponse1('')
    const response = await apiClient.post('/llm/step1', {
      inventiveMessage,
      industrialMessage,
      publicMessage,
    })

    const { content } = response.data
    setAiResponse1((prev) => prev + content)
  }

  const handleLastStepMessage = async () => {
    setAiResponse2('')
    const response = await apiClient.post('/llm/step4', {
      ideaRefinement,
      industrialRefinement,
      claims,
    })

    const { finalResponseMessage } = response.data
    setAiResponse2(finalResponseMessage)
  }

  return (
    <Box component='article'>
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

      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
        {currentStep > 0 && (
          <>
            <FirstStep
              inventiveMessage={inventiveMessage}
              setInventiveMessage={setInventiveMessage}
              publicityMessage={publicMessage}
              setPublicityMessage={setPublicMessage}
              industrialMessage={industrialMessage}
              setIndustrialMessage={setIndustrialMessage}
            />
            {currentStep === 1 && (
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
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    handleFirstStepMessage()
                    setCurrentStep(2)
                  }}
                >
                  Go to next step
                </Button>
              </Box>
            )}
          </>
        )}

        {currentStep > 1 && (
          <SecondStep
            refinementMessage={ideaRefinement}
            setRefinementMessage={setIdeaRefinement}
            aiResponse={aiResponse1}
          />
        )}

        {currentStep > 1 && aiResponse1.length > 0 && (
          <>
            <ThirdStep
              refinementMessage={industrialRefinement}
              setRefinementMessage={setIndustrialRefinement}
            />

            <FourthStep
              refinementMessage={claims}
              setRefinementMessage={setClaims}
            />
            {currentStep === 2 && (
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
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    handleLastStepMessage()
                    setCurrentStep(3)
                  }}
                >
                  Go to the final step
                </Button>
              </Box>
            )}
          </>
        )}
        {currentStep > 2 && <FinalStep aiResponse2={aiResponse2} />}
      </Box>
    </Box>
  )
}

export default InventorsAssistant
