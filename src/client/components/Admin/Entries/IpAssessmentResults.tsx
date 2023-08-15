import React from 'react'
import { IPAssessmentResult } from '@backend/types'

import IpAssessmentSectionResults from '../../InteractiveForm/IpAssessmentSectionResults'

const IpAssessmentResults = ({ resultData, sortedResultsWithLabels }: any) => {
  if (!resultData || !sortedResultsWithLabels) return null

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

export default IpAssessmentResults
