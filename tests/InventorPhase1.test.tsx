import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useInventorsContext } from '../src/client/pages/InventorsAssistant/InventorsContext'
import InventorPhase1 from '../src/client/pages/InventorsAssistant/InventorPhase1'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import React from 'react'

import '@testing-library/jest-dom'

vi.mock('../src/client/pages/InventorsAssistant/InventorsContext', () => ({
  useInventorsContext: vi.fn(),
}))

vi.mock('../src/client/pages/InventorsAssistant/FirstStep', () => ({
  default: () => <div>FirstStep Component</div>,
}))

vi.mock('../src/client/pages/InventorsAssistant/InventorIllustration', () => ({
  default: () => <div>Inventor Illustration</div>,
}))

vi.mock('../src/client/pages/InventorsAssistant/InventorStepper', () => ({
  default: () => <div>Inventor Stepper</div>,
}))

vi.mock('../src/client/pages/InventorsAssistant/StepZero', () => ({
  default: ({ currentStep }) => <div>StepZero: {currentStep}</div>,
}))

vi.mock('i18next', () => ({
  t: vi.fn((key) => {
    if (key === 'inventorsAssistant:NextStep') {
      return 'Next Step'
    }
    return key
  }),
}))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ search: 'test' }),
  }
})

describe('InventorPhase1 Component', () => {
  const mockSetCurrentStep = vi.fn()
  const mockHandleStep = vi.fn()

  beforeEach(() => {
    sessionStorage.clear()
    useInventorsContext.mockReturnValue({
      currentStep: 0,
      setCurrentStep: mockSetCurrentStep,
      inventiveMessage: '',
      setInventiveMessage: vi.fn(),
      publicityMessage: '',
      setPublicityMessage: vi.fn(),
      industrialMessage: '',
      setIndustrialMessage: vi.fn(),
      setAiResponse1: vi.fn(),
      setAiResponse1Ready: vi.fn(),
      setAiResponse1Error: vi.fn(),
      handleStep: mockHandleStep,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the InventorPhase1 component', () => {
    render(
      <MemoryRouter>
        <InventorPhase1 />
      </MemoryRouter>
    )
    expect(screen.getByText(/Inventor Illustration/i)).toBeInTheDocument()
    expect(screen.getByText(/StepZero: 0/i)).toBeInTheDocument()
  })

  test('renders FirstStep and InventorStepper when currentStep is greater than 0', () => {
    useInventorsContext.mockReturnValueOnce({
      currentStep: 1,
      setCurrentStep: mockSetCurrentStep,
      inventiveMessage: '',
      setInventiveMessage: vi.fn(),
      publicityMessage: '',
      setPublicityMessage: vi.fn(),
      industrialMessage: '',
      setIndustrialMessage: vi.fn(),
      setAiResponse1: vi.fn(),
      setAiResponse1Ready: vi.fn(),
      setAiResponse1Error: vi.fn(),
      handleStep: mockHandleStep,
    })

    render(
      <MemoryRouter>
        <InventorPhase1 />
      </MemoryRouter>
    )

    expect(screen.getByText(/Inventor Stepper/i)).toBeInTheDocument()
    expect(screen.getByText(/FirstStep Component/i)).toBeInTheDocument()
  })

  test('renders button and handles navigation on click when currentStep is 4', () => {
    useInventorsContext.mockReturnValueOnce({
      currentStep: 4,
      setCurrentStep: mockSetCurrentStep,
      inventiveMessage: '',
      setInventiveMessage: vi.fn(),
      publicityMessage: '',
      setPublicityMessage: vi.fn(),
      industrialMessage: '',
      setIndustrialMessage: vi.fn(),
      setAiResponse1: vi.fn(),
      setAiResponse1Ready: vi.fn(),
      setAiResponse1Error: vi.fn(),
      handleStep: mockHandleStep,
    })

    render(
      <MemoryRouter>
        <InventorPhase1 />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /Next Step/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(mockHandleStep).toHaveBeenCalled()
    expect(mockSetCurrentStep).toHaveBeenCalledWith(5)
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: './phase2',
      search: 'test',
    })
  })
})
