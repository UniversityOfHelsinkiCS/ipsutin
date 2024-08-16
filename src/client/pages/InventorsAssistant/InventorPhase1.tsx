import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import { fetchStream } from '../../util/apiClient'

import FirstStep from './FirstStep'
import InventorsIllustration from './InventorIllustration'
import { useInventorsContext } from './InventorsContext'
import InventorStepper from './InventorStepper'
import StepZero from './StepZero'
import processStream from './StreamReader'

const InventorPhase1 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    currentStep,
    setCurrentStep,
    inventiveMessage,
    setInventiveMessage,
    publicityMessage,
    setPublicityMessage,
    industrialMessage,
    setIndustrialMessage,
    setAiResponse1,
    setAiResponse1Ready,
    setAiResponse1Error,
  } = useInventorsContext()

  const handleFirstStep = async () => {
    setAiResponse1Error(null)
    setAiResponse1('')

    const { stream, error } = await fetchStream('/llm/step1', {
      inventiveMessage,
      industrialMessage,
      publicityMessage,
    })

    if (error) {
      setAiResponse1Error(`An error occurred: ${error}`)
      return
    }

    if (stream) {
      await processStream(stream, setAiResponse1, setAiResponse1Ready)
    } else {
      setAiResponse1Error('An unknown error occurred.')
    }
  }

  return (
    <Box component='article'>
      <InventorsIllustration />

      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
        {currentStep > 0 && <InventorStepper />}

        <StepZero currentStep={currentStep} setCurrentStep={setCurrentStep} />
        {currentStep > 0 && (
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
        )}
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
                navigate({
                  pathname: './phase2',
                  search: location.search,
                })
              }}
            >
              Next step
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default InventorPhase1
