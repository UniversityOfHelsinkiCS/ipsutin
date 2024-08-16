import { createContext, useContext, useEffect, useMemo, useState } from 'react'

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

  const [inventiveMessage, setInventiveMessage] = useState(() => {
    const saved = sessionStorage.getItem('inventiveMessage')
    return saved ? JSON.parse(saved) : inventiveMessageDynamic
  })

  const [publicityMessage, setPublicityMessage] = useState(() => {
    const saved = sessionStorage.getItem('publicityMessage')
    return saved ? JSON.parse(saved) : publicityMessageDynamic
  })

  const [industrialMessage, setIndustrialMessage] = useState(() => {
    const saved = sessionStorage.getItem('industrialMessage')
    return saved ? JSON.parse(saved) : industrialMessageDynamic
  })

  const [aiResponse1, setAiResponse1] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiResponse1')
    return saved ? JSON.parse(saved) : ''
  })

  const [aiResponse1Ready, setAiResponse1Ready] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('aiResponse1Ready')
    return saved ? JSON.parse(saved) : false
  })

  const [aiResponse1Error, setAiResponse1Error] = useState<string | null>(
    () => {
      const saved = sessionStorage.getItem('aiResponse1Error')
      return saved ? JSON.parse(saved) : null
    }
  )

  const [aiResponse2, setAiResponse2] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiResponse2')
    return saved ? JSON.parse(saved) : ''
  })

  const [aiResponse3, setAiResponse3] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiResponse3')
    return saved ? JSON.parse(saved) : ''
  })

  const [aiResponse4, setAiResponse4] = useState<string>(() => {
    const saved = sessionStorage.getItem('aiResponse4')
    return saved ? JSON.parse(saved) : ''
  })

  const [aiResponse4Ready, setAiResponse4Ready] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('aiResponse4Ready')
    return saved ? JSON.parse(saved) : false
  })

  const [editModeGlobal, setEditModeGlobal] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('editModeGlobal')
    return saved ? JSON.parse(saved) : false
  })

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem('messages')
    return saved ? JSON.parse(saved) : []
  })

  // Save state to sessionStorage on change

  useEffect(() => {
    sessionStorage.setItem('aiResponse1Error', JSON.stringify(aiResponse1Error))
  }, [aiResponse1Error])

  useEffect(() => {
    sessionStorage.setItem('currentStep', JSON.stringify(currentStep))
  }, [currentStep])

  useEffect(() => {
    sessionStorage.setItem('inventiveMessage', JSON.stringify(inventiveMessage))
  }, [inventiveMessage])

  useEffect(() => {
    sessionStorage.setItem('publicityMessage', JSON.stringify(publicityMessage))
  }, [publicityMessage])

  useEffect(() => {
    sessionStorage.setItem(
      'industrialMessage',
      JSON.stringify(industrialMessage)
    )
  }, [industrialMessage])

  useEffect(() => {
    sessionStorage.setItem('aiResponse1', JSON.stringify(aiResponse1))
  }, [aiResponse1])

  useEffect(() => {
    sessionStorage.setItem('aiResponse1Ready', JSON.stringify(aiResponse1Ready))
  }, [aiResponse1Ready])

  useEffect(() => {
    sessionStorage.setItem('aiResponse2', JSON.stringify(aiResponse2))
  }, [aiResponse2])

  useEffect(() => {
    sessionStorage.setItem('aiResponse3', JSON.stringify(aiResponse3))
  }, [aiResponse3])

  useEffect(() => {
    sessionStorage.setItem('aiResponse4', JSON.stringify(aiResponse4))
  }, [aiResponse4])

  useEffect(() => {
    sessionStorage.setItem('aiResponse4Ready', JSON.stringify(aiResponse4Ready))
  }, [aiResponse4Ready])

  useEffect(() => {
    sessionStorage.setItem('editModeGlobal', JSON.stringify(editModeGlobal))
  }, [editModeGlobal])

  useEffect(() => {
    sessionStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

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
      aiResponse1Error,
      aiResponse2,
      aiResponse3,
      aiResponse4,
      aiResponse4Ready,
      editModeGlobal,
      messages,
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
