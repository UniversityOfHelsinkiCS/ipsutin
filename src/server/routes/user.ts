import express from 'express'

import adminHandler from '../middleware/admin'
import { getUserCounts } from '../services/user'
import { RequestWithUser } from '../types'

const userRouter = express.Router()

userRouter.get('/', async (req: RequestWithUser, res: any) => {
  const { user } = req

  if (!user) return res.send({})

  return res.send({ ...user, newUser: false })
})

userRouter.get('/userCounts', adminHandler, async (req, res) => {
  const userCounts = await getUserCounts()

  return res.status(200).send(userCounts)
})

export default userRouter
