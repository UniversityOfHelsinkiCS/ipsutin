import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (aiResponse && aiResponse.length > 0 && aiResponseReady && ref.current) {
      refCallback(ref.current)
    }
  }, [aiResponse, aiResponseReady, refCallback])

  return (
    <Box ref={ref}>
      <SectionHeading level={headingLevel} sx={{ mt: 8 }}>
        {t('inventorsAssistant:finalStepSummary')}
      </SectionHeading>

      <LlmResponse
        current
        aiResponse={aiResponse}
        aiResponseReady={aiResponseReady}
        setEditedResponse={setAiResponse}
      />
    </Box>
  )
}

export default InventionReport
