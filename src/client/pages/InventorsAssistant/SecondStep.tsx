import { Dispatch, SetStateAction } from 'react'
import { Box, Typography } from '@mui/material'
import { t } from 'i18next'

import SectionHeading from '../../components/Common/SectionHeading'
import { fetchStream } from '../../util/apiClient'

import ErrorAlert from './ErrorAlert'
import { useInventorsContext } from './InventorsContext'
import LlmResponse from './LlmResponse'
import processStream from './StreamReader'

type SecondStepProps = {
  current: boolean
  setAiResponse1: Dispatch<SetStateAction<string>>
  aiResponse: string
  aiResponseReady: boolean
  setEditModeGlobal: Dispatch<SetStateAction<boolean>>
}

const SecondStep = ({
  current,
  setAiResponse1,
  aiResponse,
  aiResponseReady,
  setEditModeGlobal,
}: SecondStepProps) => {
  const {
    inventiveMessage,
    publicityMessage,
    industrialMessage,
    setAiResponse1Ready,
    aiResponse1Error,
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
    <>
      <SectionHeading level='h2' sx={{ mt: 8 }}>
        {t('inventorsAssistant:step2Header1')}
      </SectionHeading>
      <Box component='section' sx={{ mt: 4 }}>
        <Typography variant='body1' sx={{ mt: 2 }}>
          {t('inventorsAssistant:step2text1')}
        </Typography>
        <Typography variant='body1' sx={{ mt: 2 }}>
          {t('inventorsAssistant:step2text2')}
        </Typography>
      </Box>
      {aiResponse1Error ? (
        <ErrorAlert
          error={aiResponse1Error}
          handleTryAgain={() => handleFirstStep()}
        />
      ) : (
        <LlmResponse
          current={current}
          aiResponse={aiResponse}
          aiResponseReady={aiResponseReady}
          setEditedResponse={setAiResponse1}
          setEditModeGlobal={setEditModeGlobal}
        />
      )}
    </>
  )
}

export default SecondStep
