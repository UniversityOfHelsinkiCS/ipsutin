import {
  Control,
  UseFormWatch,
  FieldValues,
  UseFormRegister,
  SubmitHandler,
} from 'react-hook-form'

export interface Faculty {
  code: string
  name: Locales
}

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
  setFaculty?: React.Dispatch<React.SetStateAction<string>>
  faculty?: string
  setSurvey?: React.Dispatch<React.SetStateAction<string>>
  survey?: string
}

export interface FormValues {
  [key: number]: Record<string, { [key: string]: boolean }>
}

export type Locales = {
  en: string
  fi: string
  sv: string
}

export type SingleChoiceType = {
  results: any
  id: string
  label: Locales
  text: string
}

export interface MultipleChoiceType extends SingleChoiceType {
  data: Locales
}

export type ChoiceType = SingleChoiceType[] | MultipleChoiceType[]

export type PossibleChoiceTypes = 'singleChoice' | 'multipleChoice' | 'info'

export interface OptionData {
  type: string
  options: ChoiceType
}

/** List of question selection id's that controls the visibility of a tool */
export type Visibility = {
  options: string[]
}

export interface Survey {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  Questions: Question[]
}

export interface Question {
  id: number
  surveyId: number
  parentId: number
  priority: number
  title: Locales
  text: Locales
  optionData: OptionData
  visibility: Visibility
  createdAt: Date
  updatedAt: Date
}

export interface Result {
  id: number
  surveyId: number
  optionLabel: string
  isSelected: Locales
  createdAt: Date
  updatedAt: Date
  data: {
    [key: string]: Locales
  }
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
