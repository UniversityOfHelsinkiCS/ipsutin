import { User } from '../db/models'

type UserUpdatesTypes = {
  newFaculty: string
}

// eslint-disable-next-line import/prefer-default-export
export const updateUser = (user: User, updates: UserUpdatesTypes) => {
  const { newFaculty } = updates

  if (newFaculty && typeof newFaculty === 'string') {
    // eslint-disable-next-line no-param-reassign
    user.preferredFaculty = newFaculty
  } else {
    throw new Error('Invalid or missing newFaculty value')
  }

  // Return the updated user object
  return user
}
