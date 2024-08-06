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
    aiResponse2,
    setAiResponse2,
    aiResponse3,
    setAiResponse3,
    setAiResponse4,
    editModeGlobal,
    setEditModeGlobal,
    messages,
  } = useInventorsContext()

  const handleSecondStep = async () => {
    setAiResponse2('')
    const stream = await fetchStream('/llm/step2', {
      aiResponse1,
      messages,
    })

    if (stream) {
      await processStream(stream, setAiResponse2)
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
      await processStream(stream, setAiResponse3)
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
      await processStream(stream, setAiResponse4)
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
            setEditModeGlobal={setEditModeGlobal}
          />
        )}

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

        {currentStep > 5 && aiResponse1.length > 0 && (
          <ThirdStep
            setAiResponse2={setAiResponse2}
            aiResponse={aiResponse2}
            setEditModeGlobal={setEditModeGlobal}
          />
        )}

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
          <FourthStep
            setAiResponse3={setAiResponse3}
            aiResponse={aiResponse3}
            setEditModeGlobal={setEditModeGlobal}
          />
        )}

        {currentStep === 7 && aiResponse3.length > 0 && !editModeGlobal && (
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
