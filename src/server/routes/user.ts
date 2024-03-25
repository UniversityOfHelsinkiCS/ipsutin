import express from 'express'

import { updateUser } from '../services/user'
import { RequestWithUser } from '../types'

const userRouter = express.Router()

userRouter.get('/', async (req: RequestWithUser, res: any) => {
  const { user } = req

  if (!user) return res.send({})

  return res.send({ ...user, newUser: false })
})

userRouter.put('/:id', async (req: RequestWithUser, res: any) => {
  const { user } = req

  const updatedUser = updateUser(user.id, req.body)

  return res.send(updatedUser)
})

export default userRouter
