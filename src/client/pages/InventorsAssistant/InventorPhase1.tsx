import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import apiClient from '../../util/apiClient'

import FirstStep from './FirstStep'
import InventorsIllustration from './InventorIllustration'
import { useInventorsContext } from './InventorsContext'
import InventorStepper from './InventorStepper'
import StepZero from './StepZero'

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
    setMessages,
  } = useInventorsContext()

  const handleFirstStep = async () => {
    setAiResponse1('')
    const response = await apiClient.post('/llm/step1', {
      inventiveMessage,
      industrialMessage,
      publicityMessage,
    })

    const { content, responseMessages } = response.data
    setAiResponse1((prev) => prev + content)
    setMessages(responseMessages)
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
