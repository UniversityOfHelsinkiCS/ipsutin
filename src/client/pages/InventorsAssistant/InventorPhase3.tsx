import { Box } from '@mui/material'

import FinalStep from './FinalStep'
import { useInventorsContext } from './InventorsContext'
import SendEmail from './SendEmail'

const InventorPhase3 = () => {
  const {
    inventiveMessage,
    currentStep,
    aiResponse1,
    aiResponse2,
    aiResponse3,
    aiResponse4,
    setAiResponse4,
  } = useInventorsContext()

  return (
    <Box component='article'>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
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
        {aiResponse4 && aiResponse4.length > 0 && <SendEmail />}
      </Box>
    </Box>
  )
}

export default InventorPhase3
