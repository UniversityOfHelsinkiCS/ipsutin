import React, { createContext, useContext, useMemo, useState } from 'react'

import { FormValues } from '../../types'

interface ResultDataContextValue {
  resultData: FormValues
  setResultData: React.Dispatch<React.SetStateAction<FormValues>>
}

const LicenseResultDataContext = createContext<
  ResultDataContextValue | undefined
>(undefined)

const LicenseResultDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [resultData, setResultData] = useState<FormValues>({})

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

const useLicenseResultData = (): ResultDataContextValue => {
  const context = useContext(LicenseResultDataContext)
  if (!context) {
    throw new Error('useResultData must be used within a ResultDataProvider')
  }
  return context
}

export { LicenseResultDataProvider, useLicenseResultData }
