import express from 'express'

import adminHandler from '../middleware/admin'
import { getUserCounts } from '../services/analytic'

const analyticRouter = express.Router()

analyticRouter.get('/usercounts', adminHandler, async (req, res) => {
  const userCounts = await getUserCounts()

  return res.status(200).send(userCounts)
})

export default analyticRouter
