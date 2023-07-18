import express from 'express'

import { User } from '../db/models'
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

export default userRouter
