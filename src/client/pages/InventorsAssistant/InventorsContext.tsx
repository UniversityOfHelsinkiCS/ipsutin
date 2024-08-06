import { createContext, useContext, useMemo, useState } from 'react'

import { Message } from '../../../server/types'
import getInitialMessage from '../../util/inventorInput'

interface InventorsContextValue {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  inventiveMessage: string
  setInventiveMessage: React.Dispatch<React.SetStateAction<string>>
  publicityMessage: string
  setPublicityMessage: React.Dispatch<React.SetStateAction<string>>
  industrialMessage: string
  setIndustrialMessage: React.Dispatch<React.SetStateAction<string>>
  aiResponse1: string
  setAiResponse1: React.Dispatch<React.SetStateAction<string>>
  aiResponse2: string
  setAiResponse2: React.Dispatch<React.SetStateAction<string>>
  aiResponse3: string
  setAiResponse3: React.Dispatch<React.SetStateAction<string>>
  aiResponse4: string
  setAiResponse4: React.Dispatch<React.SetStateAction<string>>
  editModeGlobal: boolean
  setEditModeGlobal: React.Dispatch<React.SetStateAction<boolean>>
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const InventorsContext = createContext<InventorsContextValue | undefined>(
  undefined
)

const InventorsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0)
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
  const [aiResponse1, setAiResponse1] = useState('')
  const [aiResponse1Ready, setAiResponse1Ready] = useState<boolean>(false)
  const [aiResponse2, setAiResponse2] = useState('')
  const [aiResponse3, setAiResponse3] = useState('')
  const [aiResponse4, setAiResponse4] = useState('')
  const [aiResponse4Ready, setAiResponse4Ready] = useState<boolean>(false)

  const [editModeGlobal, setEditModeGlobal] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const providerValue = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      inventiveMessage,
      setInventiveMessage,
      publicityMessage,
      setPublicityMessage,
      industrialMessage,
      setIndustrialMessage,
      aiResponse1,
      setAiResponse1,
      aiResponse1Ready,
      setAiResponse1Ready,
      aiResponse2,
      setAiResponse2,
      aiResponse3,
      setAiResponse3,
      aiResponse4,
      setAiResponse4,
      aiResponse4Ready,
      setAiResponse4Ready,
      editModeGlobal,
      setEditModeGlobal,
      messages,
      setMessages,
    }),
    [
      currentStep,
      inventiveMessage,
      publicityMessage,
      industrialMessage,
      aiResponse1,
      aiResponse1Ready,
      aiResponse2,
      aiResponse3,
      aiResponse4,
      aiResponse4Ready,
      editModeGlobal,
      messages,
      setMessages,
    ]
  )

  return (
    <InventorsContext.Provider value={providerValue}>
      {children}
    </InventorsContext.Provider>
  )
}

const useInventorsContext = (): InventorsContextValue => {
  const context = useContext(InventorsContext)
  if (!context) {
    throw new Error(
      'useInventorsContext must be within a InventorsContextProvider'
    )
  }
  return context
}

export { InventorsContextProvider, useInventorsContext }
