import { FacultyCounts, UserCount } from '@backend/types'
import { Op } from 'sequelize'

import { User } from '../db/models'

import { getEntries } from './entry'
import { getFaculties } from './faculty'

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

export const getFacultyCounts = async (): Promise<FacultyCounts[]> => {
  const entries = await getEntries()

  const faculties = await getFaculties()

  const facultyCounts: { [key: string]: number } = {}

  // Count the number of entries for each faculty
  entries.forEach((entry) => {
    const { faculty } = entry.data
    if (faculty) {
      facultyCounts[faculty] = (facultyCounts[faculty] || 0) + 1
    }
  })

  const data = faculties.map((faculty) => ({
    faculty: faculty.name,
    count: facultyCounts[faculty.code] || 0,
    code: faculty.code,
  }))

  return data
}
