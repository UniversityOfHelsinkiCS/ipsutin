import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

import illustration from '../../assets/inventors_assistant_illustration.jpg'
import SectionHeading from '../../components/Common/SectionHeading'
import apiClient from '../../util/apiClient'
import getInitialMessage from '../../util/inventorInput'

import FinalStep from './FinalStep'
import FirstStep from './FirstStep'
import FourthStep from './FourthStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

const InventorsAssistant = () => {
  const { t } = useTranslation()

  const [currentStep, setCurrentStep] = useState<number>(0)

  const {
    inventiveMessageDynamic,
    publicMessageDynamic,
    industrialMessageDynamic,
  } = getInitialMessage()

  const [inventiveMessage, setInventiveMessage] = useState(
    inventiveMessageDynamic
  )
  const [publicMessage, setPublicMessage] = useState(publicMessageDynamic)
  const [industrialMessage, setIndustrialMessage] = useState(
    industrialMessageDynamic
  )
  const [aiResponse1, setAiResponse1] = useState('')
  const [aiResponse2, setAiResponse2] = useState('')
  const [aiResponse3, setAiResponse3] = useState('')
  const [aiResponse4, setAiResponse4] = useState('')

  const handleFirstStep = async () => {
    setAiResponse1('')
    const response = await apiClient.post('/llm/step1', {
      inventiveMessage,
      industrialMessage,
      publicMessage,
    })

    const { content } = response.data
    setAiResponse1((prev) => prev + content)
  }

  const handleSecondStep = async () => {
    setAiResponse2('')
    const response = await apiClient.post('/llm/step2', {
      aiResponse1,
    })

    const { content } = response.data

    setAiResponse2((prev) => prev + content)
  }

  const handleThirdStep = async () => {
    setAiResponse3('')
    const response = await apiClient.post('/llm/step3', {
      aiResponse1,
      aiResponse2,
    })

    const { content } = response.data

    setAiResponse3((prev) => prev + content)
  }

  const handleLastStep = async () => {
    setAiResponse4('')
    const response = await apiClient.post('/llm/step4', {
      aiResponse1,
      aiResponse2,
      aiResponse3,
    })

    const { finalResponseMessage } = response.data

    setAiResponse4(finalResponseMessage)
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
                    handleFirstStep()
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
          <>
            <SecondStep
              setAiResponse1={setAiResponse1}
              aiResponse={aiResponse1}
            />
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
                handleSecondStep()
                setCurrentStep(3)
              }}
            >
              Next step
            </Button>
          </>
        )}

        {currentStep > 2 && aiResponse1.length > 0 && (
          <>
            <ThirdStep
              setAiResponse2={setAiResponse2}
              aiResponse={aiResponse2}
            />
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
                handleThirdStep()
                setCurrentStep(4)
              }}
            >
              Go to Fourth Step
            </Button>

            {currentStep > 3 && (
              <>
                <FourthStep
                  setAiResponse3={setAiResponse3}
                  aiResponse={aiResponse3}
                />

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
                      handleLastStep()
                      setCurrentStep(5)
                    }}
                  >
                    Go to the final step
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
        {currentStep > 4 && (
          <FinalStep
            aiResponse={aiResponse4}
            originalIdea={inventiveMessage}
            ideaRefinement={aiResponse1}
            industrialApplicability={aiResponse2}
            claims={aiResponse3}
            setAiResponse4={setAiResponse4}
          />
        )}
      </Box>
    </Box>
  )
}

export default InventorsAssistant
