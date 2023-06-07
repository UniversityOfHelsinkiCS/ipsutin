import { Request } from 'express'

export type Faculty = {
  fi: string
  en: string
  se: string
}

export type Programme = {
  key: string
  name: Faculty
  level: string
  companionFaculties: Array<string>
  international: boolean
}

export interface OrganisationData {
  code: string
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
  type: 'singleChoice' | 'multipleChoice' | 'dimensions' | 'text' | 'info'
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
