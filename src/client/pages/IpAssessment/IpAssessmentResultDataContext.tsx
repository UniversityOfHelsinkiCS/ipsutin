import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { IP_ASSESSMENT_DATA_KEY } from '../../../config'
import { FormValues } from '../../types'

interface ResultDataContextValue {
  resultData: FormValues
  setResultData: React.Dispatch<React.SetStateAction<FormValues>>
}

const LicenseResultDataContext = createContext<
  ResultDataContextValue | undefined
>(undefined)

const IpAssessmentResultDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const getSavedInstance = useCallback(() => {
    const savedData = sessionStorage.getItem(IP_ASSESSMENT_DATA_KEY)
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

const useIpAssessmentResultData = (): ResultDataContextValue => {
  const context = useContext(LicenseResultDataContext)
  if (!context) {
    throw new Error(
      'useIpAssessmentResultData must be used within a IpAssessmentResultDataProvider'
    )
  }
  return context
}

export { IpAssessmentResultDataProvider, useIpAssessmentResultData }
