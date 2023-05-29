import { Result } from '../models'
import getIeResults from '../../data/ieResults'
import getAssessmentResults from '../../data/assessmentResults'

const seedResults = async () => {
  const ieResults: any[] = getIeResults()
  const assessmentResults: any[] = getAssessmentResults()

  const results = [...ieResults, ...assessmentResults]

  results.forEach(async (result: any) => {
    await Result.upsert({
      ...result,
    })
  })
}

export default seedResults
