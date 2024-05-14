import { Box, Step, StepLabel, Stepper } from '@mui/material'

import { useInventorsContext } from './InventorsContext'

const InventorStepper = () => {
  const { currentStep } = useInventorsContext()

  const steps = [
    'Giving your input',
    'Getting AI response on input',
    'Create Invention Report',
  ]

  const activeStep = ({ currentStep }: { currentStep: number }): number => {
    if (currentStep < 5) {
      return 0
    }
    if (currentStep < 8) {
      return 1
    }
    return 2
  }

  const step = activeStep({ currentStep })

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 'justify',
        padding: 5,
        zIndex: 10,
        background:
          'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%)',
      }}
    >
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <b>{label}</b>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default InventorStepper
