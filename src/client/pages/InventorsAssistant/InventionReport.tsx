import { Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'
import useResultRefCallback from '../../hooks/useResultRefCallback'

import LlmResponse from './LlmResponse'

type InventionReportProps = {
  aiResponse: string
  aiResponseReady: boolean
  setAiResponse: Dispatch<SetStateAction<string>>
  headingLevel: 'h2' | 'h3'
}

const InventionReport = ({
  aiResponse,
  aiResponseReady,
  setAiResponse,
  headingLevel,
}: InventionReportProps) => {
  const refCallback = useResultRefCallback()

  return (
    <Box ref={aiResponse && aiResponse.length > 0 ? refCallback : null}>
      <SectionHeading level={headingLevel} sx={{ mt: 8 }}>
        {t('inventorsAssistant:finalStepSummary')}
      </SectionHeading>

      <LlmResponse
        aiResponse={aiResponse}
        aiResponseReady={aiResponseReady}
        setEditedResponse={setAiResponse}
      />
    </Box>
  )
}

export default InventionReport
