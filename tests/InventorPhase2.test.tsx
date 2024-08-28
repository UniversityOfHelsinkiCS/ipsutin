import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useInventorsContext } from '../src/client/pages/InventorsAssistant/InventorsContext'
import InventorPhase2 from '../src/client/pages/InventorsAssistant/InventorPhase2'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import React from 'react'

import '@testing-library/jest-dom'

vi.mock('i18next', () => ({
  t: vi.fn((key) => {
    const translations = {
      'inventorsAssistant:NextStep': 'Next Step',
      'inventorsAssistant:GoToFinalStep': 'Go To Final Step',
      'inventorsAssistant:EditButton': 'EDIT AI RESPOSNE',
    }
    return translations[key] || key
  }),
}))

vi.mock('../src/client/pages/InventorsAssistant/InventorsContext', () => ({
  useInventorsContext: vi.fn(),
}))

describe('InventorPhase2 Component', () => {
  const mockHandleStep = vi.fn()
  const mockSetCurrentStep = vi.fn()

  beforeEach(() => {
    useInventorsContext.mockReturnValue({
      currentStep: 5,
      setCurrentStep: mockSetCurrentStep,
      aiResponse1: 'response1',
      aiResponse1Ready: true,
      aiResponse2: 'response2',
      aiResponse2Ready: true,
      aiResponse3: null,
      aiResponse3Ready: false,
      handleStep: mockHandleStep,
      setAiResponse1: vi.fn(),
      setAiResponse2: vi.fn(),
      setAiResponse3: vi.fn(),
      setAiResponse4: vi.fn(),
      setAiResponse4Ready: vi.fn(),
      setAiResponse4Error: vi.fn(),
      editModeGlobal: false,
      setEditModeGlobal: vi.fn(),
      messages: [],
    })

    vi.clearAllMocks()
  })

  test('renders button and handles step 2 when currentStep is 5', async () => {
    render(
      <MemoryRouter>
        <InventorPhase2 />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /Next Step/i })
    expect(button).toBeInTheDocument()

    await fireEvent.click(button)

    expect(mockHandleStep).toHaveBeenCalledWith(
      2,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Object)
    )
    expect(mockSetCurrentStep).toHaveBeenCalledWith(6)
  })

  test('renders "Next Step" button when aiResponse1Ready is true and aiResponse1Error is null, but hides the button when editModeGlobal is set to true', async () => {
    const mockHandleStep = vi.fn()
    const mockSetCurrentStep = vi.fn()

    const mockContext = (useInventorsContext as any).mockReturnValue({
      currentStep: 5,
      aiResponse1: 'response1',
      aiResponse1Ready: true,
      aiResponse1Error: null,
      editModeGlobal: false,
    })

    const { rerender } = render(
      <MemoryRouter>
        <InventorPhase2 />
      </MemoryRouter>
    )

    const nextStepButton = screen.getByRole('button', { name: /Next Step/i })
    expect(nextStepButton).toBeInTheDocument()
    ;(useInventorsContext as any).mockReturnValue({
      currentStep: 5,
      aiResponse1: 'response1',
      aiResponse1Ready: true,
      aiResponse1Error: null,
      editModeGlobal: true,
      setCurrentStep: mockSetCurrentStep,
      handleStep: mockHandleStep,
    })

    rerender(
      <MemoryRouter>
        <InventorPhase2 />
      </MemoryRouter>
    )

    screen.debug()

    expect(
      screen.queryByRole('button', { name: /Next Step/i })
    ).not.toBeInTheDocument()
  })
})
