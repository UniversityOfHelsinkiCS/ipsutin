import { Request } from 'express'

export type Faculty = {
  fi: String
  en: String
  se: String
}

export type Programme = {
  key: String
  name: Faculty
  level: String
  companionFaculties: Array<String>
  international: Boolean
}

export interface OrganisationData {
  code: String
  name: Faculty
  programmes: Array<Programme>
}

export interface TranslatedText {
  fi: string
  sv: string
  en: string
}

export interface User {
  id: string
  username: string
  firsName?: string
  lastName?: string
  email?: string
  language?: string
  isAdmin: boolean
  iamGroups: string[]
}

export interface RequestWithUser extends Request {
  user: User
}

export interface ResultUpdates {
  data?: Object
  isSelected?: string
}

export interface Result {
  id: number
  surveyId: number
  optionLabel: string
  isSelected: TranslatedText
  data: any
}

export interface Recommendation {
  id: number
  surveyId: number
  label: string
  title: TranslatedText
  text: TranslatedText
  data: {
    [key: string]: number
  }
}

type Visibility = {
  options?: string[]
}

type OptionType = {
  id: string
  label: TranslatedText
  text?: TranslatedText
  data?: TranslatedText
}

type OptionData = {
  type: string
  options: OptionType[]
}

export interface Question {
  id: number
  surveyId: number
  parentId: number
  priority: number
  title: TranslatedText
  text: TranslatedText
  optionData: OptionData
  visibility?: Visibility
}
