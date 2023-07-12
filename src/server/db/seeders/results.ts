import { Result } from '../models'
import getAssessmentResults from '../../data/assessmentResults'
import getIeResults from '../../data/ieResults'
import getLicenseResults from '../../data/licenseResults'

const seedResults = async () => {
  const assessmentResults = getAssessmentResults()
  const ieResults = getIeResults()
  const licenseResults = getLicenseResults()

  const results = [...ieResults, ...assessmentResults, ...licenseResults]

  results.forEach(async (result) => {
    await Result.upsert({
      ...result,
    })
  })
}

export default seedResults
