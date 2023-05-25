import { Result } from '../models'
import getResultData from '../../data/ieResults'

const seedResults = async () => {
  const results: any = getResultData()

  results.forEach(async (result: any) => {
    await Result.upsert({
      ...result,
    })
  })
}

export default seedResults
