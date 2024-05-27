import { Box } from '@mui/material'

import ShareResult from '../../components/Suggestion/ShareResult'
import { useLoggedInUser } from '../../hooks/useUser'
import InventionReportEmailTemplate from '../../templates/InventionReportTemplate'

import FinalStep from './FinalStep'
import { useInventorsContext } from './InventorsContext'
import InventorStepper from './InventorStepper'

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
  const { user, isLoading } = useLoggedInUser()

  if (!user || isLoading) return null

  return (
    <Box component='article'>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px' }}>
        <InventorStepper />
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
        {aiResponse4 && aiResponse4.length > 0 && (
          <ShareResult
            templateComponent={<InventionReportEmailTemplate user={user} />}
            emailSubject='Innotin: Invention Report'
          />
        )}
      </Box>
    </Box>
  )
}

export default InventorPhase3
