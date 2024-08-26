import { createContext, useContext, useMemo, useState } from 'react'

import { Message } from '../../../server/types'
import useSessionStorage from '../../hooks/useSessionStorage'
import { fetchStream } from '../../util/apiClient'
import getInitialMessage from '../../util/inventorInput'

import processStream from './StreamReader'

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
  aiResponse1Ready: boolean
  setAiResponse1Ready: React.Dispatch<React.SetStateAction<boolean>>
  aiResponse1Error: string | null
  setAiResponse1Error: React.Dispatch<React.SetStateAction<string | null>>
  aiResponse2: string
  setAiResponse2: React.Dispatch<React.SetStateAction<string>>
  aiResponse3: string
  setAiResponse3: React.Dispatch<React.SetStateAction<string>>
  aiResponse4: string
  setAiResponse4: React.Dispatch<React.SetStateAction<string>>
  aiResponse4Ready: boolean
  setAiResponse4Ready: React.Dispatch<React.SetStateAction<boolean>>
  aiResponse4Error: string | null
  setAiResponse4Error: React.Dispatch<React.SetStateAction<string | null>>
  editModeGlobal: boolean
  setEditModeGlobal: React.Dispatch<React.SetStateAction<boolean>>
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  handleStep: (
    step: number,
    setAiResponse: React.Dispatch<React.SetStateAction<string>>,
    setAiResponseReady: React.Dispatch<React.SetStateAction<boolean>>,
    setAiResponseError: React.Dispatch<React.SetStateAction<string | null>>,
    aiResponseData: any
  ) => Promise<void>
}

const InventorsContext = createContext<InventorsContextValue | undefined>(
  undefined
)

const InventorsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Load initial state from sessionStorage or use default initial state
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const saved = sessionStorage.getItem('currentStep')
    return saved ? JSON.parse(saved) : 0
  })

  const {
    inventiveMessageDynamic,
    publicityMessageDynamic,
    industrialMessageDynamic,
  } = getInitialMessage()

  const [inventiveMessage, setInventiveMessage] = useSessionStorage(
    'inventiveMessage',
    inventiveMessageDynamic
  )
  const [publicityMessage, setPublicityMessage] = useSessionStorage(
    'publicityMessage',
    publicityMessageDynamic
  )
  const [industrialMessage, setIndustrialMessage] = useSessionStorage(
    'industrialMessage',
    industrialMessageDynamic
  )

  const [aiResponse1, setAiResponse1] = useSessionStorage('aiResponse1', '')
  const [aiResponse1Ready, setAiResponse1Ready] = useSessionStorage(
    'aiResponse1Ready',
    false
  )
  const [aiResponse1Error, setAiResponse1Error] = useSessionStorage(
    'aiResponse1Error',
    null
  )

  const [aiResponse2, setAiResponse2] = useSessionStorage('aiResponse2', '')
  const [aiResponse3, setAiResponse3] = useSessionStorage('aiResponse3', '')
  const [aiResponse4, setAiResponse4] = useSessionStorage('aiResponse4', '')
  const [aiResponse4Ready, setAiResponse4Ready] = useSessionStorage(
    'aiResponse4Ready',
    false
  )
  const [aiResponse4Error, setAiResponse4Error] = useSessionStorage(
    'aiResponse4Error',
    null
  )

  const [editModeGlobal, setEditModeGlobal] = useSessionStorage(
    'editModeGlobal',
    false
  )

  const [messages, setMessages] = useSessionStorage('messages', [])

  const handleStep = async (
    step: number,
    setAiResponse: React.Dispatch<React.SetStateAction<string>>,
    setAiResponseReady: React.Dispatch<React.SetStateAction<boolean>>,
    setAiResponseError: React.Dispatch<React.SetStateAction<string | null>>,
    aiResponseData: any
  ) => {
    setAiResponseError(null)
    setAiResponse('')

    const { stream, error } = await fetchStream(
      `/llm/step${step}`,
      aiResponseData
    )

    if (error) {
      setAiResponseError(`An error occurred: ${error}`)
      return
    }

    if (stream) {
      await processStream(stream, setAiResponse, setAiResponseReady)
    } else {
      setAiResponseError('An unknown error occurred.')
    }
  }

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
      aiResponse1Error,
      setAiResponse1Error,
      aiResponse4Error,
      setAiResponse4Error,
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
      handleStep,
    }),
    [
      currentStep,
      inventiveMessage,
      publicityMessage,
      industrialMessage,
      aiResponse1,
      aiResponse1Ready,
      aiResponse1Error,
      aiResponse4Error,
      aiResponse2,
      aiResponse3,
      aiResponse4,
      aiResponse4Ready,
      editModeGlobal,
      messages,
      handleStep,
      setCurrentStep,
      setInventiveMessage,
      setPublicityMessage,
      setIndustrialMessage,
      setAiResponse1,
      setAiResponse1Ready,
      setAiResponse1Error,
      setAiResponse2,
      setAiResponse3,
      setAiResponse4,
      setAiResponse4Ready,
      setAiResponse4Error,
      setEditModeGlobal,
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
