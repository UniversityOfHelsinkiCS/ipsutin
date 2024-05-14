import { createContext, useMemo, useState } from 'react'

import getInitialMessage from '../../util/inventorInput'

interface InventorsContextValue {
  inventiveMessage: string
  setInventiveMessage: React.Dispatch<React.SetStateAction<string>>
  publicityMessage: string
  setPublicityMessage: React.Dispatch<React.SetStateAction<string>>
  industrialMessage: string
  setIndustrialMessage: React.Dispatch<React.SetStateAction<string>>
}

const InventorsContext = createContext<InventorsContextValue | undefined>(
  undefined
)

const InventorsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {
    inventiveMessageDynamic,
    publicityMessageDynamic,
    industrialMessageDynamic,
  } = getInitialMessage()

  const [inventiveMessage, setInventiveMessage] = useState(
    inventiveMessageDynamic
  )
  const [publicityMessage, setPublicityMessage] = useState(
    publicityMessageDynamic
  )

  const [industrialMessage, setIndustrialMessage] = useState(
    industrialMessageDynamic
  )

  const providerValue = useMemo(
    () => ({
      inventiveMessage,
      setInventiveMessage,
      publicityMessage,
      setPublicityMessage,
      industrialMessage,
      setIndustrialMessage,
    }),
    [inventiveMessage, publicityMessage, industrialMessage]
  )

  return (
    <InventorsContext.Provider value={providerValue}>
      {children}
    </InventorsContext.Provider>
  )
}

export default InventorsContextProvider
