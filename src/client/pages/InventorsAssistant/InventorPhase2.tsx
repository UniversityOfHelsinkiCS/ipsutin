import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import apiClient from '../../util/apiClient'

import FourthStep from './FourthStep'
import { useInventorsContext } from './InventorsContext'
import InventorStepper from './InventorStepper'
import SecondStep from './SecondStep'
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
  } = useInventorsContext()

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
