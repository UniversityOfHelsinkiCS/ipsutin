import { useTranslation } from 'react-i18next'
import { IPAssessmentResult, Locales } from '@backend/types'
import { Box, Typography } from '@mui/material'

import styles from '../../styles'
import Markdown from '../Common/Markdown'

import ResultElement from './ResultElement'

const { cardStyles } = styles

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
    <Box>
      <Typography
        data-cy={`ip-assessment-${section}-result-section-title`}
        variant='h6'
        style={{
          fontWeight: '200',
          textAlign: 'left',
          marginBottom: '1rem',
          marginLeft: '1rem',
        }}
        component='h4'
      >
        {t(`ipAssessmentSurvey:${section}Title`)}
      </Typography>

      <Box>
        {results.map((result) => (
          <ResultElement
            key={result.id}
            language={language as keyof Locales}
            resultData={result}
            dimensions={[]}
          />
        ))}
      </Box>

      <Box sx={cardStyles.card}>
        {isPotentiallyPatentable ? (
          <Markdown>{t(`ipAssessmentSurvey:${section}Patentable`)}</Markdown>
        ) : (
          <Markdown>{t(`ipAssessmentSurvey:${section}NotPatentable`)}</Markdown>
        )}
      </Box>
    </Box>
  )
}

export default IpAssessmentSectionResults
