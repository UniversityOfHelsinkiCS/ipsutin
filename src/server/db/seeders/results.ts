import getAssessmentResults from '../../data/assessmentResults'
import getIeResults from '../../data/ieResults'
import getLicenceResults from '../../data/licenceResults'
import { Result } from '../models'

const seedResults = async () => {
  const assessmentResults = getAssessmentResults()
  const ieResults = getIeResults()
  const licenceResults = getLicenceResults()

  const results = [...ieResults, ...assessmentResults, ...licenceResults]

  results.forEach(async (result) => {
    await Result.upsert({
      ...result,
    })
  })
}

export default seedResults
