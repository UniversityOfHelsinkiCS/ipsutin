import { Request } from 'express'

export interface Locales {
  fi: string
  sv: string
  en: string
}

export type Programme = {
  key: string
  name: Locales
  level: string
  companionFaculties: Array<string>
  international: boolean
}

export interface OrganisationData {
  code: string
  name: Locales
  programmes: Array<Programme>
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

export interface Result {
  id: number
  surveyId: number
  optionLabel: string
  isSelected: Locales
  data: any
}

export interface Recommendation {
  id: number
  surveyId: number
  label: string
  title: Locales
  text: Locales
  data: {
    [key: string]: number
  }
}

type Visibility = {
  options?: string[]
}

type OptionType = {
  id: string
  label: Locales
  text?: Locales
  data?: Locales
}

type OptionData = {
  type: 'singleChoice' | 'multipleChoice' | 'dimensions' | 'text' | 'info'
  options: OptionType[]
}

export interface Question {
  id: number
  surveyId: number
  parentId: number
  priority: number
  title: Locales
  text: Locales
  optionData: OptionData
  visibility?: Visibility
}
