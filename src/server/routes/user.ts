import express from 'express'

import { User } from '../db/models'
import adminHandler from '../middleware/admin'
import { getUserCounts } from '../services/user'
import { RequestWithUser } from '../types'

const userRouter = express.Router()

userRouter.get('/login', async (req: RequestWithUser, res) => {
  const { user } = req

  if (!user.id) return res.send({})

  const [updatedUser] = await User.upsert({
    ...user,
    lastLoggedIn: new Date(),
  })

  return res.send(updatedUser)
})

userRouter.get('/userCounts', adminHandler, async (req, res) => {
  const userCounts = await getUserCounts()

  return res.status(200).send(userCounts)
})

export default userRouter
