import { Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'
import useResultRefCallback from '../../hooks/useResultRefCallback'

import LlmResponse from './LlmResponse'

type InventionReportProps = {
  aiResponse: string
  setAiResponse: Dispatch<SetStateAction<string>>
}

const InventionReport = ({
  aiResponse,
  setAiResponse,
}: InventionReportProps) => {
  const refCallback = useResultRefCallback()

  return (
    <Box ref={aiResponse && aiResponse.length > 0 ? refCallback : null}>
      <SectionHeading level='h2' sx={{ mt: 8 }}>
        {t('inventorsAssistant:finalStepSummary')}
      </SectionHeading>

      <LlmResponse aiResponse={aiResponse} setEditedResponse={setAiResponse} />
    </Box>
  )
}

export default InventionReport
