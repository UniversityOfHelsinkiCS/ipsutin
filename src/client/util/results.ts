import { RecommendationLabel, Result } from '@backend/types'

import { FormValues } from '../types'

export const getCommonResult = (results: Result[]) =>
  results.find((result) => result.optionLabel === 'common')

export const getFilteredResults = (results: Result[], formValues: FormValues) =>
  results.filter((result) =>
    Object.values(formValues).includes(result.optionLabel)
  )

export const getResultsWithLabels = (
  results: Result[],
  formValues: FormValues,
  labels: RecommendationLabel[]
) => {
  const filteredResults = getFilteredResults(results, formValues)

  const sortedResultsWithLabels = filteredResults
    .map((result) => ({
      ...result,
      labels,
    }))
    .sort((a, b) => a.id - b.id)

  return sortedResultsWithLabels
}
