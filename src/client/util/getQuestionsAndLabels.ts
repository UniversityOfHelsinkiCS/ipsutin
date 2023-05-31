import { InputProps } from '../types'

const getQuestionsAndLabels = ({ formResultData }: InputProps) => {
  const questions = document.getElementsByClassName('questions')

  const titles = Array.from(questions).map((title) => title.innerHTML)
  const labels: any[] = []

  Object.values(formResultData)
    .slice(0, Object.values(formResultData).length - 1)
    .forEach((value) => {
      if (value !== '') {
        const label = document.getElementById(`choice-select-${value}`)
        labels.push(label.outerText)
      } else {
        labels.push('')
      }
    })

  return Object.fromEntries(titles.map((_, i) => [titles[i], labels[i]]))
}

export default getQuestionsAndLabels
