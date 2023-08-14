import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { Locales, Question } from '@backend/types'

export interface InputProps {
  control?: Control<FieldValues>
  watch?: UseFormWatch<FieldValues>
  register?: UseFormRegister<FieldValues>
  question?: Question
  children?: React.ReactNode
  language?: string
  questions?: Question[]
  handleSubmit?: SubmitHandler<FieldValues>
  isSubmitted?: boolean
  formResultData?: FormValues
  answers?: object
  showContact?: SubmitHandler<FieldValues>
  survey?: Survey
  surveyName?: string
  surveyInfo?: string
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

export type SurveyName = 'licences' | 'ideaEvaluation' | 'ipAssessment'

export interface Survey {
  id: number
  name: SurveyName
  createdAt: Date
  updatedAt: Date
  Questions: Question[]
}

export type SurveySave =
  | 'ipsutin_licenses_local_save'
  | 'ipsutin_idea_evaluation_local_save'
  | 'ipsutin_ip_assessment_local_save'
