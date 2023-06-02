/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import useSurvey from '../../hooks/useSurvey'
import useResults from '../../hooks/useResults'
import styles from '../../styles'
import { InputProps, Locales, Result } from '../../types'
import ResultButtons from '../ResultButtons/ResultButtons'
import Markdown from '../Common/Markdown'

const { cardStyles, resultStyles } = styles

const ResultElement = ({
  language,
  resultData,
}: {
  language: keyof Locales
  resultData: Result
}) => {
  if (!resultData) return null

  return (
    <Container
      style={{
        margin: '2rem 0 2rem 0',
        borderLeft: 'solid',
        borderColor: '#9ca3af',
        borderWidth: '1px',
      }} /* sx={resultStyles.resultElementWrapper} */
    >
      <Box style={{ margin: '2rem 0 2rem 1rem' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>
      <Box
        style={{
          margin: '2rem 0 2rem 0',
        }} /* sx={resultStyles.resultElementContent} */
      >
        <Box
          key={`${JSON.stringify(resultData)}`}
          style={{
            margin: '1rem',
            padding: '0 2rem 0 2rem ',
            borderLeft: 'solid',
            borderWidth: '6px',
          }}
          /* sx={{ m: 2, px: 2, borderLeft: 6, borderColor: color }} */
        >
          <Markdown>{resultData.data[language]}</Markdown>
        </Box>
      </Box>
    </Container>
  )
}

const Results = ({ formResultData, watch }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { survey } = useSurvey('licenses')
  const { results, isSuccess: resultsFetched } = useResults(survey?.id)

  const { language } = i18n

  if (!resultsFetched || !formResultData) return null

  const resultArray = Object.values(formResultData).map((aChoice: string) => [
    aChoice,
  ])

  return (
    <Box>
      <Box sx={cardStyles.outerBox}>
        <Box sx={resultStyles.resultWrapper}>
          <Container sx={{ mt: 4 }}>
            <Typography
              data-cy="result-section-title"
              variant="h5"
              sx={resultStyles.heading}
              component="div"
            >
              {t('results:title')}
            </Typography>
          </Container>

          <Box>
            {resultArray.map((resultLabels) =>
              resultLabels.map((resultLabel) => (
                <ResultElement
                  key={JSON.stringify(resultLabel)}
                  language={language as keyof Locales}
                  resultData={results.find(
                    (result: { optionLabel: string }) =>
                      result.optionLabel === resultLabel
                  )}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
      <ResultButtons watch={watch} />
    </Box>
  )
}

export default Results
