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
}: FinalStepProps) => {
  const boxStyle = {
    my: 4,
    p: 4,
    backgroundColor: '#E9F7E7',
    color: 'black',
    borderRadius: 1,
  }

  return (
    <Box>
      <SectionHeading level='h1' sx={{ mt: 8 }}>
        {t('inventorsAssistant:finalStepHeader1')}
      </SectionHeading>

      <Typography variant='body1' sx={{ mt: 2 }}>
        {t('inventorsAssistant:finalStepText1')}
      </Typography>

      <InventionReport
        aiResponse={aiResponse}
        setAiResponse={setAiResponse4}
        headingLevel='h2'
      />

      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepOriginalIdea')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <Markdown>{originalIdea}</Markdown>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepRefinedIdea')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <Markdown>{ideaRefinement}</Markdown>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepIndustrialApplicability')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <Markdown>{industrialApplicability}</Markdown>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SectionHeading level='h3'>
            {t('inventorsAssistant:finalStepClaims')}
          </SectionHeading>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={boxStyle}>
            <Markdown>{claims}</Markdown>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FinalStep
