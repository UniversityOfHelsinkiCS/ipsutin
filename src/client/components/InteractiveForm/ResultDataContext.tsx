import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { FormValues } from '../../types'

interface ResultDataContextValue {
  resultData: FormValues
  setResultData: React.Dispatch<React.SetStateAction<FormValues>>
}

const ResultDataContext = createContext<ResultDataContextValue | undefined>(
  undefined
)

const ResultDataProvider = ({
  dataKey,
  children,
}: {
  dataKey: string
  children: React.ReactNode
}) => {
  const getSavedInstance = useCallback(() => {
    const savedData = sessionStorage.getItem(dataKey)
    if (savedData) return JSON.parse(savedData)

    return {}
  }, [dataKey])

  const savedFormData = getSavedInstance()

  const [resultData, setResultData] = useState<FormValues>(savedFormData)

  const contextValue = useMemo(
    () => ({ resultData, setResultData }),
    [resultData, setResultData]
  )

  return (
    <ResultDataContext.Provider value={contextValue}>
      {children}
    </ResultDataContext.Provider>
  )
}

const useResultData = (): ResultDataContextValue => {
  const context = useContext(ResultDataContext)
  if (!context) {
    throw new Error('useResultData must be used within a ResultDataProvider')
  }
  return context
}

export { ResultDataProvider, useResultData }
