import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import { fetchStream } from '../../util/apiClient'

import FourthStep from './FourthStep'
import { useInventorsContext } from './InventorsContext'
import InventorStepper from './InventorStepper'
import SecondStep from './SecondStep'
import processStream from './StreamReader'
import ThirdStep from './ThirdStep'

const InventorPhase2 = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    currentStep,
    setCurrentStep,
    aiResponse1,
    setAiResponse1,
    aiResponse1Ready,
    aiResponse2,
    setAiResponse2,
    aiResponse3,
    setAiResponse3,
    setAiResponse4,
    setAiResponse4Ready,
    setAiResponse4Error,
    editModeGlobal,
    setEditModeGlobal,
    messages,
  } = useInventorsContext()

  const [aiResponse2Ready, setAiResponse2Ready] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('aiResponse2Ready')
    return saved ? JSON.parse(saved) : false
  })

  const [aiResponse2Error, setAiResponse2Error] = useState<string | null>(
    () => {
      const saved = sessionStorage.getItem('aiResponse2Error')
      return saved ? JSON.parse(saved) : null
    }
  )

  const [aiResponse3Ready, setAiResponse3Ready] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('aiResponse3Ready')
    return saved ? JSON.parse(saved) : false
  })

  const [aiResponse3Error, setAiResponse3Error] = useState<string | null>(
    () => {
      const saved = sessionStorage.getItem('aiResponse2Error')
      return saved ? JSON.parse(saved) : null
    }
  )

  const [llmResponseCurrent1, setLlmResponseCurrent1] = useState<boolean>(
    () => {
      const saved = sessionStorage.getItem('llmResponseCurrent1')
      return saved ? JSON.parse(saved) : true
    }
  )
  const [llmResponseCurrent2, setLlmResponseCurrent2] = useState<boolean>(
    () => {
      const saved = sessionStorage.getItem('llmResponseCurrent2')
      return saved ? JSON.parse(saved) : true
    }
  )
  const [llmResponseCurrent3, setLlmResponseCurrent3] = useState<boolean>(
    () => {
      const saved = sessionStorage.getItem('llmResponseCurrent3')
      return saved ? JSON.parse(saved) : true
    }
  )

  useEffect(() => {
    sessionStorage.setItem(
      'llmResponseCurrent1',
      JSON.stringify(llmResponseCurrent1)
    )
  }, [llmResponseCurrent1])
  useEffect(() => {
    sessionStorage.setItem(
      'llmResponseCurrent2',
      JSON.stringify(llmResponseCurrent2)
    )
  }, [llmResponseCurrent2])
  useEffect(() => {
    sessionStorage.setItem(
      'llmResponseCurrent3',
      JSON.stringify(llmResponseCurrent3)
    )
  }, [llmResponseCurrent3])

  useEffect(() => {
    sessionStorage.setItem('aiResponse2Ready', JSON.stringify(aiResponse2Ready))
  }, [aiResponse2Ready])

  useEffect(() => {
    sessionStorage.setItem('aiResponse3Ready', JSON.stringify(aiResponse3Ready))
  }, [aiResponse3Ready])

  const handleSecondStep = async () => {
    setAiResponse2Error(null)
    setAiResponse2('')

    const { stream, error } = await fetchStream('/llm/step2', {
      aiResponse1,
      messages,
    })

    if (error) {
      setAiResponse2Error(`An error occurred: ${error}`)
      return
    }

    if (stream) {
      await processStream(stream, setAiResponse2, setAiResponse2Ready)
    } else {
      setAiResponse2Error('An unknown error occurred.')
    }
  }

  const handleThirdStep = async () => {
    setAiResponse3Error(null)
    setAiResponse3('')

    const { stream, error } = await fetchStream('/llm/step3', {
      aiResponse1,
      aiResponse2,
      messages,
    })

    if (error) {
      setAiResponse3Error(`An error occurred: ${error}`)
      return
    }

    if (stream) {
      await processStream(stream, setAiResponse3, setAiResponse3Ready)
    } else {
      setAiResponse3Error('An unknown error occurred.')
    }
  }

  const handleLastStep = async () => {
    setAiResponse4Error(null)
    setAiResponse4('')

    const { stream, error } = await fetchStream('/llm/step4', {
      aiResponse1,
      aiResponse2,
      aiResponse3,
      messages,
    })

    if (error) {
      setAiResponse4Error(`An error occurred: ${error}`)
      return
    }

    if (stream) {
      await processStream(stream, setAiResponse4, setAiResponse4Ready)
    } else {
      setAiResponse4Error('An unknown error occurred.')
    }
  }

  return (
    <Box component='article'>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
        <InventorStepper />
        {currentStep > 4 && (
          <SecondStep
            current={llmResponseCurrent1}
            setAiResponse1={setAiResponse1}
            aiResponse={aiResponse1}
            aiResponseReady={aiResponse1Ready}
            setEditModeGlobal={setEditModeGlobal}
          />
        )}

        {currentStep === 5 && !editModeGlobal && aiResponse1Ready && (
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
              setLlmResponseCurrent1(false)
            }}
          >
            Next step
          </Button>
        )}

        {currentStep > 5 && aiResponse1.length > 0 && (
          <ThirdStep
            current={llmResponseCurrent2}
            setAiResponse2={setAiResponse2}
            aiResponse={aiResponse2}
            aiResponseReady={aiResponse2Ready}
            setEditModeGlobal={setEditModeGlobal}
            aiResponseError={aiResponse2Error}
            handleTryAgain={handleSecondStep}
          />
        )}

        {currentStep === 6 && !editModeGlobal && aiResponse2Ready && (
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
              setLlmResponseCurrent2(false)
            }}
          >
            Next step
          </Button>
        )}

        {currentStep > 6 && (
          <FourthStep
            current={llmResponseCurrent3}
            setAiResponse3={setAiResponse3}
            aiResponse={aiResponse3}
            aiResponseReady={aiResponse3Ready}
            setEditModeGlobal={setEditModeGlobal}
            aiResponseError={aiResponse3Error}
            handleTryAgain={handleThirdStep}
          />
        )}

        {currentStep === 7 && !editModeGlobal && aiResponse3Ready && (
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
                setCurrentStep(8)
                setLlmResponseCurrent3(false)
                navigate({
                  pathname: '../phase3',
                  search: location.search,
                })
              }}
            >
              Go to the final step
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default InventorPhase2
