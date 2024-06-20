import { Box, Button } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
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

  const giveFeedback = () => {
    window.open(
      'https://forms.office.com/e/FtnY1K7Yef',
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <Box component='article'>
      <Box component='section' sx={{ mx: 'auto', maxWidth: '1024px', mb: 4 }}>
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
      </Box>
      {aiResponse4 && aiResponse4.length > 0 && (
        <Box
          sx={{
            my: 4,
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '1024px',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ width: '50%', paddingRight: 2 }}>
            <ShareResult
              templateComponent={<InventionReportEmailTemplate user={user} />}
              emailSubject='Innotin: Invention Report'
            />
          </Box>

          <Box sx={{ width: '50%', mt: 8, paddingLeft: 2 }}>
            <SectionHeading level='h2'>
              {t('inventorsAssistant:WeNeedFeedbackHeader')}
            </SectionHeading>
            <Markdown>{t('inventorsAssistant:WeNeedFeedbackText')}</Markdown>
            <Button
              sx={{
                px: 8,
                py: 2,
                mt: 2,
                borderRadius: '1rem',
                textTransform: 'capitalize',
                fontWeight: '700',
                fontSize: '18pt',
              }}
              variant='contained'
              color='secondary'
              onClick={giveFeedback}
            >
              {t('inventorsAssistant:WeNeedFeedbackButton')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default InventorPhase3
