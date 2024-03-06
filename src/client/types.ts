import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form'
import {
  Locales,
  Question,
  RecommendationLabel,
  Result,
  Survey,
} from '@backend/types'

export interface InputProps {
  control?: Control<any>
  watch?: UseFormWatch<any>
  register?: UseFormRegister<any>
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
  selected: boolean
  onClick: any
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
