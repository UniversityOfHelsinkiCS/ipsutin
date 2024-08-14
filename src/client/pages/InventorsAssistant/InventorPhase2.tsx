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
    editModeGlobal,
    setEditModeGlobal,
    messages,
  } = useInventorsContext()

  const [aiResponse2Ready, setAiResponse2Ready] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('aiResponse2Ready')
    return saved ? JSON.parse(saved) : false
  })

  const [aiResponse3Ready, setAiResponse3Ready] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('aiResponse3Ready')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    sessionStorage.setItem('aiResponse2Ready', JSON.stringify(aiResponse2Ready))
  }, [aiResponse2Ready])

  useEffect(() => {
    sessionStorage.setItem('aiResponse3Ready', JSON.stringify(aiResponse3Ready))
  }, [aiResponse3Ready])

  const handleSecondStep = async () => {
    setAiResponse2('')
    const stream = await fetchStream('/llm/step2', {
      aiResponse1,
      messages,
    })

    if (stream) {
      await processStream(stream, setAiResponse2, setAiResponse2Ready)
    }
  }

  const handleThirdStep = async () => {
    setAiResponse3('')
    const stream = await fetchStream('/llm/step3', {
      aiResponse1,
      aiResponse2,
      messages,
    })

    if (stream) {
      await processStream(stream, setAiResponse3, setAiResponse3Ready)
    }
  }

  const handleLastStep = async () => {
    setAiResponse4('')
    const stream = await fetchStream('/llm/step4', {
      aiResponse1,
      aiResponse2,
      aiResponse3,
      messages,
    })

    if (stream) {
      await processStream(stream, setAiResponse4, setAiResponse4Ready)
    }
  }

  return (
    <Box component='article'>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
        <InventorStepper />
        {currentStep > 4 && (
          <SecondStep
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
            }}
          >
            Next step
          </Button>
        )}

        {currentStep > 5 && aiResponse1.length > 0 && (
          <ThirdStep
            setAiResponse2={setAiResponse2}
            aiResponse={aiResponse2}
            aiResponseReady={aiResponse2Ready}
            setEditModeGlobal={setEditModeGlobal}
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
            }}
          >
            Next step
          </Button>
        )}

        {currentStep > 6 && (
          <FourthStep
            setAiResponse3={setAiResponse3}
            aiResponse={aiResponse3}
            aiResponseReady={aiResponse3Ready}
            setEditModeGlobal={setEditModeGlobal}
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
