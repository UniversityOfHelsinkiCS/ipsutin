import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { LICENCES_DATA_KEY } from '../../../config'
import { FormValues } from '../../types'

interface ResultDataContextValue {
  resultData: FormValues
  setResultData: React.Dispatch<React.SetStateAction<FormValues>>
}

const LicenseResultDataContext = createContext<
  ResultDataContextValue | undefined
>(undefined)

const LicenceResultDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [resultData, setResultData] = useState<FormValues>({})

  useEffect(() => {
    const savedData = sessionStorage.getItem(LICENCES_DATA_KEY)
    if (savedData) setResultData(JSON.parse(savedData))
  }, [])

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

const useLicenceResultData = (): ResultDataContextValue => {
  const context = useContext(LicenseResultDataContext)
  if (!context) {
    throw new Error('useResultData must be used within a ResultDataProvider')
  }
  return context
}

export { LicenceResultDataProvider, useLicenceResultData }
