import express from 'express'

import adminHandler from '../middleware/admin'
import { getFacultyCounts, getUserCounts } from '../services/analytic'

const analyticRouter = express.Router()

analyticRouter.get('/usercounts', adminHandler, async (req, res) => {
  const userCounts = await getUserCounts()

  return res.status(200).send(userCounts)
})

analyticRouter.get('/facultycounts', adminHandler, async (req, res) => {
  const facultyCounts = await getFacultyCounts()

  return res.status(200).send(facultyCounts)
})

export default analyticRouter
