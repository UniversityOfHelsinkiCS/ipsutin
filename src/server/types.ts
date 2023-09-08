import { Request } from 'express'

export interface Locales {
  fi: string
  sv: string
  en: string
}

export interface UserInfo {
  uid: string
  hyPersonSisuId: string
  email: string
  hyGroupCn: string[]
  preferredLanguage: string
  given_name: string
  family_name: string
}

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  language: string
  isAdmin: boolean
  iamGroups: string[]
  newUser?: boolean
}

export interface RequestWithUser extends Request {
  user: User
}

export interface UserCount {
  name: 'today' | 'deltaAllTime'
  value: number
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

export type Faculty = Omit<OrganisationData, 'programmes'>

export interface FacultyCounts {
  faculty: Locales
  count: number
  code: string
}

export interface Result {
  id: number
  surveyId: number
  optionLabel: string
  isSelected: Locales
  data: {
    resultData: {
      [key in RecommendationLabel]?: Locales
    }
  }
}

export interface IPAssessmentResult extends Omit<Result, 'data'> {
  data: {
    type?: 'technical' | 'mathematical' | 'computerProgram'
    potentiallyPatentable?: boolean
    resultData: {
      [key in RecommendationLabel]?: Locales
    }
  }
}

export type RecommendationLabel =
  | 'allDimensions'
  | 'disclosure'
  | 'clinic'
  | 'relations'
  | 'incubator'
  | 'legal'
  | 'gnu_gpl'
  | 'bsd_mit'

export interface Recommendation {
  id: number
  surveyId: number
  label: RecommendationLabel
  title: Locales
  text: Locales
  data: {
    [key: string]: number
  }
}

export type Visibility = {
  options?: string[]
}

export type OptionType = {
  id: string
  label: Locales
  text?: Locales
  data?: Locales
}

export type PossibleChoiceTypes = 'singleChoice' | 'multipleChoice' | 'info'

export type OptionData = {
  type: PossibleChoiceTypes
  options: OptionType[]
}

export interface Question {
  id: number
  surveyId: number
  parentId: number | null
  priority: number
  title: Locales
  text: Locales
  optionData: OptionData
  visibility: Visibility
}

export type SurveyName = 'licences' | 'ideaEvaluation' | 'ipAssessment'

export interface Survey {
  id: number
  name: SurveyName
  createdAt: Date
  updatedAt: Date
  Questions: Question[]
}

export interface FormValues {
  [key: number]: Record<string, { [key: string]: boolean }>
  faculty?: string
}

export interface EntryValues {
  data: FormValues
  sessionToken: string
}

export interface EntryWithSurvey {
  id: number
  surveyId: number
  data: FormValues
  sessionToken: string
  createdAt: Date
  updatedAt: Date
  Survey: Survey
  SurveyId: number
}
