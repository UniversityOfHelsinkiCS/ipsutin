import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import {
  InventorsContextProvider,
  useInventorsContext,
} from '../src/client/pages/InventorsAssistant/InventorsContext'
import React from 'react'
import { vi } from 'vitest'
import { fetchStream } from '../src/client/util/apiClient'
import { processStream } from '../src/client/pages/InventorsAssistant/ProcessStream'

vi.mock('../src/client/util/apiClient', () => ({
  fetchStream: vi.fn(),
}))

vi.mock('../src/client/pages/InventorsAssistant/ProcessStream', () => ({
  processStream: vi.fn(),
}))

describe('InventorsContext', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('should provide initial context values', () => {
    const { result } = renderHook(() => useInventorsContext(), {
      wrapper: ({ children }) => (
        <InventorsContextProvider>{children}</InventorsContextProvider>
      ),
    })

    // Expect initial values
    expect(result.current.currentStep).toBe(0)
    expect(result.current.inventiveMessage).toBe('')
    expect(result.current.publicityMessage).toBe('')
    expect(result.current.industrialMessage).toBe('')
    expect(result.current.aiResponse1).toBe('')
    expect(result.current.aiResponse1Ready).toBe(false)
    expect(result.current.aiResponse1Error).toBe(null)
    expect(result.current.aiResponse2).toBe('')
    expect(result.current.aiResponse3).toBe('')
    expect(result.current.aiResponse4).toBe('')
    expect(result.current.aiResponse4Ready).toBe(false)
    expect(result.current.aiResponse4Error).toBe(null)
    expect(result.current.editModeGlobal).toBe(false)
    expect(result.current.messages).toEqual([])
  })

  it('should update context state correctly', () => {
    const wrapper = ({ children }) => (
      <InventorsContextProvider>{children}</InventorsContextProvider>
    )

    const { result } = renderHook(() => useInventorsContext(), { wrapper })

    // Change values first
    act(() => {
      result.current.setCurrentStep(2)
      result.current.setInventiveMessage('New inventive message')
      result.current.setPublicityMessage('New publicity message')
      result.current.setIndustrialMessage('New industrial message')
      result.current.setAiResponse1('New AI response 1')
      result.current.setAiResponse1Ready(true)
      result.current.setAiResponse1Error('No Error')
      result.current.setAiResponse2('New AI response 2')
      result.current.setAiResponse3('New AI response 3')
      result.current.setAiResponse4('New AI response 4')
      result.current.setAiResponse4Ready(true)
      result.current.setAiResponse4Error('No Error')
      result.current.setEditModeGlobal(true)
      result.current.setMessages([
        {
          content: 'Message 1',
          role: 'user',
        },
      ])
    })

    // Now verify updated values
    expect(result.current.currentStep).toBe(2)
    expect(result.current.inventiveMessage).toBe('New inventive message')
    expect(result.current.publicityMessage).toBe('New publicity message')
    expect(result.current.industrialMessage).toBe('New industrial message')
    expect(result.current.aiResponse1).toBe('New AI response 1')
    expect(result.current.aiResponse1Ready).toBe(true)
    expect(result.current.aiResponse1Error).toBe('No Error')
    expect(result.current.aiResponse2).toBe('New AI response 2')
    expect(result.current.aiResponse3).toBe('New AI response 3')
    expect(result.current.aiResponse4).toBe('New AI response 4')
    expect(result.current.aiResponse4Ready).toBe(true)
    expect(result.current.aiResponse4Error).toBe('No Error')
    expect(result.current.editModeGlobal).toBe(true)
    expect(result.current.messages).toEqual([
      { content: 'Message 1', role: 'user' },
    ])
  })

  it('should update context state and save to sessionStorage correctly', () => {
    const wrapper = ({ children }) => (
      <InventorsContextProvider>{children}</InventorsContextProvider>
    )

    const { result } = renderHook(() => useInventorsContext(), { wrapper })

    // Change values first
    act(() => {
      result.current.setCurrentStep(2)
      result.current.setInventiveMessage('New inventive message')
      result.current.setPublicityMessage('New publicity message')
      result.current.setIndustrialMessage('New industrial message')
      result.current.setAiResponse1('New AI response 1')
      result.current.setAiResponse1Ready(true)
      result.current.setAiResponse1Error('No Error')
      result.current.setAiResponse2('New AI response 2')
      result.current.setAiResponse3('New AI response 3')
      result.current.setAiResponse4('New AI response 4')
      result.current.setAiResponse4Ready(true)
      result.current.setAiResponse4Error('No Error')
      result.current.setEditModeGlobal(true)
      result.current.setMessages([{ content: 'Message 1', role: 'user' }])
    })

    // Now verify updated values
    expect(result.current.currentStep).toBe(2)
    expect(result.current.inventiveMessage).toBe('New inventive message')
    expect(result.current.publicityMessage).toBe('New publicity message')
    expect(result.current.industrialMessage).toBe('New industrial message')
    expect(result.current.aiResponse1).toBe('New AI response 1')
    expect(result.current.aiResponse1Ready).toBe(true)
    expect(result.current.aiResponse1Error).toBe('No Error')
    expect(result.current.aiResponse2).toBe('New AI response 2')
    expect(result.current.aiResponse3).toBe('New AI response 3')
    expect(result.current.aiResponse4).toBe('New AI response 4')
    expect(result.current.aiResponse4Ready).toBe(true)
    expect(result.current.aiResponse4Error).toBe('No Error')
    expect(result.current.editModeGlobal).toBe(true)
    expect(result.current.messages).toEqual([
      { content: 'Message 1', role: 'user' },
    ])

    // Verify that values are correctly stored in sessionStorage
    expect(sessionStorage.getItem('currentStep')).toBe('2')
    expect(sessionStorage.getItem('inventiveMessage')).toBe(
      '"New inventive message"'
    )
    expect(sessionStorage.getItem('publicityMessage')).toBe(
      '"New publicity message"'
    )
    expect(sessionStorage.getItem('industrialMessage')).toBe(
      '"New industrial message"'
    )
    expect(sessionStorage.getItem('aiResponse1')).toBe('"New AI response 1"')
    expect(sessionStorage.getItem('aiResponse1Ready')).toBe('true')
    expect(sessionStorage.getItem('aiResponse1Error')).toBe('"No Error"')
    expect(sessionStorage.getItem('aiResponse2')).toBe('"New AI response 2"')
    expect(sessionStorage.getItem('aiResponse3')).toBe('"New AI response 3"')
    expect(sessionStorage.getItem('aiResponse4')).toBe('"New AI response 4"')
    expect(sessionStorage.getItem('aiResponse4Ready')).toBe('true')
    expect(sessionStorage.getItem('aiResponse4Error')).toBe('"No Error"')
    expect(sessionStorage.getItem('editModeGlobal')).toBe('true')
    expect(sessionStorage.getItem('messages')).toBe(
      '[{"content":"Message 1","role":"user"}]'
    )
  })
})

describe('InventorsContext handleStep', () => {
  it('should update aiResponse, aiResponseReady, and aiResponseError correctly', async () => {
    const mockStream = 'mocked stream data'
    const mockData = { someData: 'test' }
    const mockSetAiResponse = vi.fn()
    const mockSetAiResponseReady = vi.fn()
    const mockSetAiResponseError = vi.fn()

    fetchStream.mockResolvedValue({ stream: mockStream, error: null })
    processStream.mockImplementation(
      async (stream, setAiResponse, setAiResponseReady) => {
        setAiResponse('Processed Data')
        setAiResponseReady(true)
      }
    )

    const { result } = renderHook(() => useInventorsContext(), {
      wrapper: ({ children }) => (
        <InventorsContextProvider>{children}</InventorsContextProvider>
      ),
    })

    await act(async () => {
      await result.current.handleStep(
        1,
        mockSetAiResponse,
        mockSetAiResponseReady,
        mockSetAiResponseError,
        mockData
      )
    })

    expect(fetchStream).toHaveBeenCalledWith('/llm/step1', mockData)
    expect(processStream).toHaveBeenCalledWith(
      mockStream,
      mockSetAiResponse,
      mockSetAiResponseReady
    )
    expect(mockSetAiResponse).toHaveBeenCalledWith('Processed Data')
    expect(mockSetAiResponseReady).toHaveBeenCalledWith(true)
    expect(mockSetAiResponseError).toHaveBeenCalledWith(null) // Ensure no error occurred
  })

  it('should set aiResponseError if an error occurs', async () => {
    const mockError = 'Test error'
    const mockData = { someData: 'test' }
    const mockSetAiResponse = vi.fn()
    const mockSetAiResponseReady = vi.fn()
    const mockSetAiResponseError = vi.fn()

    fetchStream.mockResolvedValue({ stream: null, error: mockError })

    const { result } = renderHook(() => useInventorsContext(), {
      wrapper: ({ children }) => (
        <InventorsContextProvider>{children}</InventorsContextProvider>
      ),
    })

    await act(async () => {
      await result.current.handleStep(
        1,
        mockSetAiResponse,
        mockSetAiResponseReady,
        mockSetAiResponseError,
        mockData
      )
    })

    expect(fetchStream).toHaveBeenCalledWith('/llm/step1', mockData)
    expect(mockSetAiResponseError).toHaveBeenCalledWith(
      `An error occurred: ${mockError}`
    )
    expect(mockSetAiResponse).toHaveBeenCalledOnce()
    expect(mockSetAiResponseReady).not.toHaveBeenCalled()
  })
})
