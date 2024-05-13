import { useState } from 'react'
import { Box, Button } from '@mui/material'

import apiClient from '../../util/apiClient'
import getInitialMessage from '../../util/inventorInput'

import FinalStep from './FinalStep'
import FirstStep from './FirstStep'
import FourthStep from './FourthStep'
import SecondStep from './SecondStep'
import SendEmail from './SendEmail'
import StepZero from './StepZero'
import ThirdStep from './ThirdStep'

const InventorsAssistant = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const {
    inventiveMessageDynamic,
    publicityMessageDynamic,
    industrialMessageDynamic,
  } = getInitialMessage()

  const [inventiveMessage, setInventiveMessage] = useState(
    inventiveMessageDynamic
  )
  const [publicityMessage, setPublicityMessage] = useState(
    publicityMessageDynamic
  )

  const [industrialMessage, setIndustrialMessage] = useState(
    industrialMessageDynamic
  )

  const [aiResponse1, setAiResponse1] = useState('')
  const [aiResponse2, setAiResponse2] = useState('')
  const [aiResponse3, setAiResponse3] = useState('')
  const [aiResponse4, setAiResponse4] = useState('')
  const [editModeGlobal, setEditModeGlobal] = useState(false)

  const handleFirstStep = async () => {
    setAiResponse1('')
    const response = await apiClient.post('/llm/step1', {
      inventiveMessage,
      industrialMessage,
      publicityMessage,
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
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              inventiveMessage={inventiveMessage}
              setInventiveMessage={setInventiveMessage}
              publicityMessage={publicityMessage}
              setPublicityMessage={setPublicityMessage}
              industrialMessage={industrialMessage}
              setIndustrialMessage={setIndustrialMessage}
            />

            {currentStep === 4 && (
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
                    setCurrentStep(5)
                  }}
                >
                  Next step
                </Button>
              </Box>
            )}
          </>
        )}

        {currentStep > 4 && (
          <>
            <SecondStep
              setAiResponse1={setAiResponse1}
              aiResponse={aiResponse1}
              setEditModeGlobal={setEditModeGlobal}
            />

            {currentStep === 5 && aiResponse1.length > 0 && !editModeGlobal && (
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
                  setCurrentStep(6)
                }}
              >
                Next step
              </Button>
            )}
          </>
        )}

        {currentStep > 5 && aiResponse1.length > 0 && (
          <>
            <ThirdStep
              setAiResponse2={setAiResponse2}
              aiResponse={aiResponse2}
              setEditModeGlobal={setEditModeGlobal}
            />
            {currentStep === 6 && aiResponse2.length > 0 && !editModeGlobal && (
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
                  setCurrentStep(7)
                }}
              >
                Next step
              </Button>
            )}

            {currentStep > 6 && (
              <>
                <FourthStep
                  setAiResponse3={setAiResponse3}
                  aiResponse={aiResponse3}
                  setEditModeGlobal={setEditModeGlobal}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {currentStep === 7 &&
                    aiResponse3.length > 0 &&
                    !editModeGlobal && (
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
                          setCurrentStep(8)
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
        {currentStep > 7 && (
          <FinalStep
            aiResponse={aiResponse4}
            originalIdea={inventiveMessage}
            ideaRefinement={aiResponse1}
            industrialApplicability={aiResponse2}
            claims={aiResponse3}
            setAiResponse4={setAiResponse4}
          />
        )}
        <SendEmail />
      </Box>
    </Box>
  )
}

export default InventorsAssistant
