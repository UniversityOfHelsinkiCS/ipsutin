import React from 'react'
import { IPAssessmentResult } from '@backend/types'

import { ResultElementsProps } from '../../types'

import IpAssessmentSectionResults from './IpAssessmentSectionResults'

const IpAssessmentResultElements = ({
  sortedResultsWithLabels,
}: ResultElementsProps) => {
  if (!sortedResultsWithLabels) return null

  const technicalResults = sortedResultsWithLabels.filter(
    (result: IPAssessmentResult) => result.data.type === 'technical'
  )

  const mathematicalResults = sortedResultsWithLabels.filter(
    (result: IPAssessmentResult) => result.data.type === 'mathematical'
  )

  const computerProgramResults = sortedResultsWithLabels.filter(
    (result: IPAssessmentResult) => result.data.type === 'computerProgram'
  )

  return (
    <>
      <IpAssessmentSectionResults
        section='technical'
        results={technicalResults}
      />

      <IpAssessmentSectionResults
        section='mathematical'
        results={mathematicalResults}
      />

      <IpAssessmentSectionResults
        section='computerProgram'
        results={computerProgramResults}
      />
    </>
  )
}

export default IpAssessmentResultElements
