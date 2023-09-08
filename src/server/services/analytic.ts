import { UserCount } from '@backend/types'
import { Op } from 'sequelize'

import { User } from '../db/models'

// eslint-disable-next-line import/prefer-default-export
export const getUserCounts = async (): Promise<UserCount[]> => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const countOfAllUsers = await User.count({})

  const countOfTodaysUsers = await User.count({
    where: {
      lastLoggedIn: {
        [Op.gte]: today,
      },
    },
  })

  const userCounts: UserCount[] = [
    {
      name: 'today',
      value: countOfTodaysUsers,
    },
    {
      name: 'deltaAllTime',
      value: countOfAllUsers - countOfTodaysUsers,
    },
  ]

  return userCounts
}
