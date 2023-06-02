import { Result } from '../models'
import getIeResults from '../../data/ieResults'
import getAssessmentResults from '../../data/assessmentResults'
import getLicenseResults from '../../data/licenseResults'

const seedResults = async () => {
  const ieResults = getIeResults()
  const assessmentResults = getAssessmentResults()
  const licenseResults = getLicenseResults()

  const results = [...ieResults, ...assessmentResults, ...licenseResults]

  results.forEach(async (result: any) => {
    await Result.upsert({
      ...result,
    })
  })
}

export default seedResults
