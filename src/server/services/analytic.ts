import { Op } from 'sequelize'

import { User } from '../db/models'
import {
  FacultyCount,
  SurveyCounts,
  SurveyName,
  surveyNames,
  UserCount,
} from '../types'

import { getEntries, getEntriesBySurvey } from './entry'
import { getFaculties } from './faculty'

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

export const getFacultyCounts = async (): Promise<FacultyCount[]> => {
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

export const getSurveyCounts = async (): Promise<SurveyCounts[]> => {
  const entries = await getEntries()

  const surveyCounts: { [key in SurveyName]: number } = {
    licences: 0,
    ideaEvaluation: 0,
    ipAssessment: 0,
  }

  entries.forEach((entry) => {
    const surveyName = entry.Survey.name
    if (surveyName) {
      surveyCounts[surveyName] = (surveyCounts[surveyName] || 0) + 1
    }
  })

  const data = surveyNames.map((surveyName) => ({
    survey: surveyName,
    count: surveyCounts[surveyName],
  }))

  return data
}

export const getSurveyAnswerDistribution = async (surveyName: string) => {
  const entries = await getEntriesBySurvey(surveyName)

  return entries
}
