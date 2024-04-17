import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import {
  Locales,
  Question,
  RecommendationLabel,
  Result,
  Survey,
} from '@backend/types'

export type Set<T> = React.Dispatch<React.SetStateAction<T>>

export interface InputProps {
  control?: Control<FormValues, unknown>
  watch?: UseFormWatch<FieldValues>
  register?: UseFormRegister<FieldValues>
  question?: Question
  children?: React.ReactNode
  language?: string
  questions?: Question[]
  isSubmitted?: boolean
  formResultData?: FormValues
  answers?: object
  survey?: Survey
  surveyName?: string
  surveyInfo?: string
}

export interface ProductCardProps {
  title: string
  description: string
  href: string
  imgPath?: string
}

export type Role = 'system' | 'assistant' | 'user'
export interface Message {
  role: Role
  content: string
}

export type ServiceContactMethod = 'manual' | 'email' | 'form'
export interface Service {
  id: string
  title: Locales
  label: RecommendationLabel
  colors: {
    background: string
  }
  description?: Locales
  contact?: {
    method: ServiceContactMethod
    data: {
      title?: Locales
      content: Locales
      formEmail?: string
    }
  }
  links?: Locales[]
}

export interface FormValues {
  [key: number]: Record<string, { [key: string]: boolean }>
  faculty?: string
}

export type SingleChoiceType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any
  id: string
  label: Locales
  text: string
}

export interface MultipleChoiceType extends SingleChoiceType {
  data: Locales
}

export interface ResultElementsProps {
  sortedResultsWithLabels: ResultWithLabels[]
}

export interface ResultWithLabels extends Result {
  labels: RecommendationLabel[]
}

export type SurveySave =
  | 'ipsutin_licenses_local_save'
  | 'ipsutin_idea_evaluation_local_save'
  | 'ipsutin_ip_assessment_local_save'
