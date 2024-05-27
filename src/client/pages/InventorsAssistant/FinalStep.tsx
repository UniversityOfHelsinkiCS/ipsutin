import { Dispatch, SetStateAction } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Typography,
} from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'
import SectionHeading from '../../components/Common/SectionHeading'

import InventionReport from './InventionReport'

type FinalStepProps = {
  aiResponse: string
  originalIdea: string
  ideaRefinement: string
  industrialApplicability: string
  claims: string
  setAiResponse4: Dispatch<SetStateAction<string>>
}

const FinalStep = ({
  aiResponse,
  originalIdea,
  ideaRefinement,
  industrialApplicability,
  claims,
  setAiResponse4,
}: FinalStepProps) => (
  <Box>
    <SectionHeading level='h2' sx={{ mt: 8 }}>
      {t('inventorsAssistant:finalStepHeader1')}
    </SectionHeading>

    <Typography variant='body1' sx={{ mt: 2 }}>
      {t('inventorsAssistant:finalStepText1')}
    </Typography>

    <InventionReport aiResponse={aiResponse} setAiResponse={setAiResponse4} />

    <Accordion defaultExpanded={false} sx={{ mt: 8 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SectionHeading level='h3'>
          {t('inventorsAssistant:finalStepOriginalIdea')}
        </SectionHeading>
      </AccordionSummary>
      <AccordionDetails>
        <Alert severity='success' sx={{ my: 4, p: 4 }}>
          <Markdown>{originalIdea}</Markdown>
        </Alert>
      </AccordionDetails>
    </Accordion>

    <Accordion sx={{ mt: 8 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SectionHeading level='h3'>
          {t('inventorsAssistant:finalStepRefinedIdea')}
        </SectionHeading>
      </AccordionSummary>
      <AccordionDetails>
        <Alert severity='success' sx={{ my: 4, p: 4 }}>
          <Markdown>{ideaRefinement}</Markdown>
        </Alert>
      </AccordionDetails>
    </Accordion>

    <Accordion sx={{ mt: 8 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SectionHeading level='h3'>
          {t('inventorsAssistant:finalStepIndustrialApplicability')}
        </SectionHeading>
      </AccordionSummary>
      <AccordionDetails>
        <Alert severity='success' sx={{ my: 4, p: 4 }}>
          <Markdown>{industrialApplicability}</Markdown>
        </Alert>
      </AccordionDetails>
    </Accordion>

    <Accordion sx={{ mt: 8 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SectionHeading level='h3'>
          {t('inventorsAssistant:finalStepClaims')}
        </SectionHeading>
      </AccordionSummary>
      <AccordionDetails>
        <Alert severity='success' sx={{ my: 4, p: 4 }}>
          <Markdown>{claims}</Markdown>
        </Alert>
      </AccordionDetails>
    </Accordion>
  </Box>
)

export default FinalStep
