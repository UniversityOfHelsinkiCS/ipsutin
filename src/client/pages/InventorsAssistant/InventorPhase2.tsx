import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { t } from 'i18next'

import useSessionStorage from '../../hooks/useSessionStorage'

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
    handleStep,
  } = useInventorsContext()

  const [aiResponse2Ready, setAiResponse2Ready] = useSessionStorage<boolean>(
    'aiResponse2Ready',
    false
  )

  const [aiResponse2Error, setAiResponse2Error] = useSessionStorage<
    string | null
  >('aiResponse2Error', null)

  const [aiResponse3Ready, setAiResponse3Ready] = useSessionStorage<boolean>(
    'aiResponse3Ready',
    false
  )

  const [aiResponse3Error, setAiResponse3Error] = useSessionStorage<
    string | null
  >('aiResponse3Error', null)

  const [llmResponseCurrent1, setLlmResponseCurrent1] =
    useSessionStorage<boolean>('llmResponseCurrent1', true)

  const [llmResponseCurrent2, setLlmResponseCurrent2] =
    useSessionStorage<boolean>('llmResponseCurrent2', true)

  const [llmResponseCurrent3, setLlmResponseCurrent3] =
    useSessionStorage<boolean>('llmResponseCurrent3', true)

  const handleSecondStep = () => {
    handleStep(2, setAiResponse2, setAiResponse2Ready, setAiResponse2Error, {
      aiResponse1,
      messages,
    })
  }

  const handleThirdStep = () => {
    handleStep(3, setAiResponse3, setAiResponse3Ready, setAiResponse3Error, {
      aiResponse1,
      aiResponse2,
      messages,
    })
  }

  const handleLastStep = () => {
    handleStep(4, setAiResponse4, setAiResponse4Ready, setAiResponse4Error, {
      aiResponse1,
      aiResponse2,
      aiResponse3,
      messages,
    })
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
            {t('inventorsAssistant:NextStep')}
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
            {t('inventorsAssistant:NextStep')}
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
              {t('inventorsAssistant:GoToFinalStep')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default InventorPhase2
