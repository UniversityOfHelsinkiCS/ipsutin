import React from 'react'
import { useTranslation } from 'react-i18next'
import { Locales } from '@backend/types'

import { ResultElementsProps } from '../../../types'
import ResultElement from '../../InteractiveForm/ResultElement'

const DefaultResultElements = ({
  sortedResultsWithLabels,
}: ResultElementsProps) => {
  const { i18n } = useTranslation()

  const { language } = i18n

  if (!sortedResultsWithLabels) return null

  return (
    <>
      {sortedResultsWithLabels.map((result) => (
        <ResultElement
          key={result.id}
          language={language as keyof Locales}
          resultData={result}
          dimensions={result.labels}
        />
      ))}
    </>
  )
}

export default DefaultResultElements
