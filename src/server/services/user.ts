import { UserUpdates, UserUpdatesZod } from '../../validators/user'
import { User } from '../db/models'
import NotFoundError from '../errors/NotFoundError'
import ZodValidationError from '../errors/ValidationError'

// eslint-disable-next-line import/prefer-default-export
export const updateUser = async (userID: string, updates: UserUpdates) => {
  const userToUpdate = await User.findByPk(userID)

  if (!userToUpdate)
    throw new NotFoundError(`User with id: ${userID} not found`)

  const validatedData = UserUpdatesZod.safeParse(updates)

  if (!validatedData?.success) {
    throw new ZodValidationError('Validation Error', validatedData.error)
  }

  const updatedUser = await userToUpdate.update(validatedData.data)

  return updatedUser
}
