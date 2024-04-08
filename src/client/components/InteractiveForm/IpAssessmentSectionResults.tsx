import { useTranslation } from 'react-i18next'
import { IPAssessmentResult, Locales } from '@backend/types'
import { Box } from '@mui/material'

import Markdown from '../Common/Markdown'
import SectionHeading from '../Common/SectionHeading'

import ResultElement from './ResultElement'

const IpAssessmentSectionResults = ({
  section,
  results,
}: {
  section: 'technical' | 'mathematical' | 'computerProgram'
  results: IPAssessmentResult[]
}) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n

  const isPotentiallyPatentable = results.every(
    (result) => result.data.potentiallyPatentable
  )

  if (!section || results.length === 0) return null

  return (
    <Box component='section'>
      <SectionHeading
        data-cy={`ip-assessment-${section}-result-section-title`}
        level='h4'
      >
        {t(`ipAssessmentSurvey:${section}Title`)}
      </SectionHeading>
      <Box sx={{ mt: 2, mb: 8 }}>
        {isPotentiallyPatentable ? (
          <Markdown>{t(`ipAssessmentSurvey:${section}Patentable`)}</Markdown>
        ) : (
          <Markdown>{t(`ipAssessmentSurvey:${section}NotPatentable`)}</Markdown>
        )}
      </Box>

      {results.map((result) => (
        <ResultElement
          key={result.id}
          language={language as keyof Locales}
          resultData={result}
          dimensions={[]}
        />
      ))}
    </Box>
  )
}

export default IpAssessmentSectionResults
