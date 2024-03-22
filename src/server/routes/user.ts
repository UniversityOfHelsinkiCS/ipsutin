import express from 'express'

import User from '../db/models/User'
import { RequestWithUser } from '../types'

const userRouter = express.Router()

userRouter.get('/', async (req: RequestWithUser, res: any) => {
  const { user } = req
  console.log('AT GETTING USER')
  if (!user) return res.send({})
  const a = await User.findOne({ where: { id: user.id } })
  console.log('a:', a)
  console.log('USER', user)

  return res.send({ ...user, newUser: false })
})

userRouter.put('/:id', async (req: RequestWithUser, res: any) => {
  const { user } = req
  const { preferredFaculty } = req.body
  console.log('UPDATING USER')
  console.log('user:', user)
  console.log('preferredFaculty:', preferredFaculty)

  if (user && preferredFaculty) {
    try {
      const [updatedRowsCount, updatedUsers] = await User.update(
        { preferredFaculty },
        { where: { id: user.id }, returning: true }
      )

      if (updatedRowsCount > 0) {
        console.log('updated rows')
        return res.status(200).json({ updatedUser: updatedUsers[0] })
      }
      console.log('no rows to update')
      return res.status(404).json({ error: 'User not found' })
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    return res
      .status(400)
      .json({ error: 'Preferred faculty is required in the request body' })
  }
})

export default userRouter
