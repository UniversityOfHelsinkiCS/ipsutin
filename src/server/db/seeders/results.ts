import { Result } from '../models'
import getAssessmentQuestionaireResults from '../../data/assessmentQuestionaireResults'
import getAssessmentResults from '../../data/assessmentResults'
import getIeResults from '../../data/ieResults'
import getLicenseResults from '../../data/licenseResults'

const seedResults = async () => {
  const assessmentQuestionnaireResults = getAssessmentQuestionaireResults()
  const assessmentResults = getAssessmentResults()
  const ieResults = getIeResults()
  const licenseResults = getLicenseResults()

  const results = [
    ...assessmentQuestionnaireResults,
    ...ieResults,
    ...assessmentResults,
    ...licenseResults,
  ]

  results.forEach(async (result) => {
    await Result.upsert({
      ...result,
    })
  })
}

export default seedResults
