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
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
        mb: 5,
      }}
    >
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default InventorStepper
