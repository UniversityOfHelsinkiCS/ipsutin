import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { IDEA_EVALUATION_DATA_KEY } from '../../../config'
import { FormValues } from '../../types'

interface ResultDataContextValue {
  resultData: FormValues
  setResultData: React.Dispatch<React.SetStateAction<FormValues>>
}

const LicenseResultDataContext = createContext<
  ResultDataContextValue | undefined
>(undefined)

const IdeaEvaluationResultDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const getSavedInstance = useCallback(() => {
    const savedData = sessionStorage.getItem(IDEA_EVALUATION_DATA_KEY)
    if (savedData) return JSON.parse(savedData)

    return {}
  }, [])

  const savedFormData = getSavedInstance()

  const [resultData, setResultData] = useState<FormValues>(savedFormData)

  const contextValue = useMemo(
    () => ({ resultData, setResultData }),
    [resultData, setResultData]
  )

  return (
    <LicenseResultDataContext.Provider value={contextValue}>
      {children}
    </LicenseResultDataContext.Provider>
  )
}

const useIdeaEvaluationResultData = (): ResultDataContextValue => {
  const context = useContext(LicenseResultDataContext)
  if (!context) {
    throw new Error(
      'useIdeaEvaluationResultData must be used within a IdeaEvaluationResultDataProvider'
    )
  }
  return context
}

export { IdeaEvaluationResultDataProvider, useIdeaEvaluationResultData }
