import { Dispatch, SetStateAction } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'
import { fetchStream } from '../../util/apiClient'

import ErrorAlert from './ErrorAlert'
import InventionReport from './InventionReport'
import { useInventorsContext } from './InventorsContext'
import processStream from './StreamReader'

type FinalStepProps = {
  aiResponse: string
  aiResponseReady: boolean
  originalIdea: string
  ideaRefinement: string
  industrialApplicability: string
  claims: string
  setAiResponse4: Dispatch<SetStateAction<string>>
}

const styles = {
  accordionDetails: {
    p: 4,
  },
}

const FinalStep = ({
  aiResponse,
  aiResponseReady,
  originalIdea,
  ideaRefinement,
  industrialApplicability,
  claims,
  setAiResponse4,
}: FinalStepProps) => {
  const {
    aiResponse1,
    aiResponse2,
    aiResponse3,
    setAiResponse4Ready,
    aiResponse4Error,
    setAiResponse4Error,
    messages,
  } = useInventorsContext()

  const handleLastStep = async () => {
    setAiResponse4Error(null)
    setAiResponse4('')

    const { stream, error } = await fetchStream('/llm/step4', {
      aiResponse1,
      aiResponse2,
      aiResponse3,
      messages,
    })

    if (error) {
      setAiResponse4Error(`An error occurred: ${error}`)
      return
    }

    if (stream) {
      await processStream(stream, setAiResponse4, setAiResponse4Ready)
    } else {
      setAiResponse4Error('An unknown error occurred.')
    }
  }
  return (
    <Box>
      <SectionHeading level='h1' sx={{ mt: 8 }}>
        {t('inventorsAssistant:finalStepHeader1')}
      </SectionHeading>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepText1')}
      </Typography>
      {aiResponse4Error ? (
        <ErrorAlert
          error={aiResponse4Error}
          handleTryAgain={() => handleLastStep()}
        />
      ) : (
        <InventionReport
          aiResponse={aiResponse}
          aiResponseReady={aiResponseReady}
          setAiResponse={setAiResponse4}
          headingLevel='h2'
        />
      )}

      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepOriginalIdea')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Markdown>{originalIdea}</Markdown>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepRefinedIdea')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Markdown>{ideaRefinement}</Markdown>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepIndustrialApplicability')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Markdown>{industrialApplicability}</Markdown>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepClaims')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Markdown>{claims}</Markdown>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FinalStep
