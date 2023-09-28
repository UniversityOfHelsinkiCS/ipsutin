import React from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'
import { Box } from '@mui/material'

import { ResultElementsProps } from '../../types'

import ResultElement from './ResultElement'

const DefaultResultElements = ({
  sortedResultsWithLabels,
}: ResultElementsProps) => {
  const { i18n } = useTranslation()

  const { language } = i18n

  if (!sortedResultsWithLabels) return null

  return (
    <Box style={{ margin: '1rem 0 0 0' }}>
      {sortedResultsWithLabels.map((result) => (
        <ResultElement
          key={result.id}
          language={language as keyof Locales}
          resultData={result}
          dimensions={result.labels}
        />
      ))}
    </Box>
  )
}

export default DefaultResultElements
