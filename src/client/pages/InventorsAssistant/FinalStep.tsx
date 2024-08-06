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

import InventionReport from './InventionReport'

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
}: FinalStepProps) => (
  <Box>
    <SectionHeading level='h1' sx={{ mt: 8 }}>
      {t('inventorsAssistant:finalStepHeader1')}
    </SectionHeading>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepText1')}
    </Typography>

    <InventionReport
      aiResponse={aiResponse}
      aiResponseReady={aiResponseReady}
      setAiResponse={setAiResponse4}
      headingLevel='h2'
    />

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

export default FinalStep
