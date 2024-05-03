import { useState } from 'react'
import { Box, Button } from '@mui/material'

import apiClient from '../../util/apiClient'
import getInitialMessage from '../../util/inventorInput'

import FinalStep from './FinalStep'
import FirstStep from './FirstStep'
import FourthStep from './FourthStep'
import SecondStep from './SecondStep'
import StepZero from './StepZero'
import ThirdStep from './ThirdStep'

const InventorsAssistant = () => {
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
      <StepZero currentStep={currentStep} setCurrentStep={setCurrentStep} />

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
                {currentStep === 1 && (
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
                    Next step
                  </Button>
                )}
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

            {currentStep === 2 && (
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
            )}
          </>
        )}

        {currentStep > 2 && aiResponse1.length > 0 && (
          <>
            <ThirdStep
              setAiResponse2={setAiResponse2}
              aiResponse={aiResponse2}
            />
            {currentStep === 3 && (
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
                Next step
              </Button>
            )}

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
                  {currentStep === 4 && (
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
                  )}
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
