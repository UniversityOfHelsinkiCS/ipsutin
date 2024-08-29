import { render, screen } from '@testing-library/react'
import InventorPhase3 from '../src/client/pages/InventorsAssistant/InventorPhase3'
import { useLoggedInUser } from '../src/client/hooks/useUser'
import { MemoryRouter } from 'react-router-dom'
import { useInventorsContext } from '../src/client/pages/InventorsAssistant/InventorsContext'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import React from 'react'

import '@testing-library/jest-dom'

vi.mock('i18next', () => ({
  t: vi.fn((key) => {
    const translations = {
      'inventorsAssistant:WeNeedFeedbackButton': 'Give Feedback',
    }
    return translations[key] || key
  }),
}))

vi.mock('../src/client/pages/InventorsAssistant/InventorsContext', () => ({
  useInventorsContext: vi.fn(),
}))

vi.mock('../src/client/hooks/useUser', () => ({
  useLoggedInUser: vi.fn(),
}))

describe('InventorPhase3 Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders ShareResult and feedback button when aiResponse4 is not null and aiResponse4Ready is true', () => {
    useInventorsContext.mockReturnValue({
      inventiveMessage: 'Some inventive message',
      currentStep: 8,
      aiResponse1: 'Response 1',
      aiResponse2: 'Response 2',
      aiResponse3: 'Response 3',
      aiResponse4: 'Response 4',
      aiResponse4Ready: true,
      setAiResponse4: vi.fn(),
    })
    ;(useLoggedInUser as any).mockReturnValue({
      user: { id: 1, name: 'John Doe' },
      isLoading: false,
    })

    render(
      <MemoryRouter>
        <InventorPhase3 />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('button', { name: /Give Feedback/i })
    ).toBeInTheDocument()
  })

  test('does not render ShareResult and feedback button when aiResponse4 is null', () => {
    ;(useInventorsContext as any).mockReturnValue({
      inventiveMessage: 'Some inventive message',
      currentStep: 8,
      aiResponse1: 'Response 1',
      aiResponse2: 'Response 2',
      aiResponse3: 'Response 3',
      aiResponse4: null,
      aiResponse4Ready: true,
      setAiResponse4: vi.fn(),
    })
    ;(useLoggedInUser as any).mockReturnValue({
      user: { id: 1, name: 'John Doe' },
      isLoading: false,
    })

    render(
      <MemoryRouter>
        <InventorPhase3 />
      </MemoryRouter>
    )

    expect(
      screen.queryByRole('button', { name: /Give Feedback/i })
    ).not.toBeInTheDocument()
  })

  test('does not render ShareResult and feedback button when aiResponse4Ready is false', () => {
    ;(useInventorsContext as any).mockReturnValue({
      inventiveMessage: 'Some inventive message',
      currentStep: 8,
      aiResponse1: 'Response 1',
      aiResponse2: 'Response 2',
      aiResponse3: 'Response 3',
      aiResponse4: 'Response 4',
      aiResponse4Ready: false,
      setAiResponse4: vi.fn(),
    })
    ;(useLoggedInUser as any).mockReturnValue({
      user: { id: 1, name: 'John Doe' },
      isLoading: false,
    })

    render(
      <MemoryRouter>
        <InventorPhase3 />
      </MemoryRouter>
    )

    expect(
      screen.queryByRole('button', { name: /Give Feedback/i })
    ).not.toBeInTheDocument()
  })

  test('renders nothing when user is loading or not logged in', () => {
    ;(useInventorsContext as any).mockReturnValue({
      inventiveMessage: 'Some inventive message',
      currentStep: 8,
      aiResponse1: 'Response 1',
      aiResponse2: 'Response 2',
      aiResponse3: 'Response 3',
      aiResponse4: 'Response 4',
      aiResponse4Ready: true,
      setAiResponse4: vi.fn(),
    })
    ;(useLoggedInUser as any).mockReturnValue({
      user: null,
      isLoading: false,
    })

    const { container } = render(
      <MemoryRouter>
        <InventorPhase3 />
      </MemoryRouter>
    )

    expect(container).toBeEmptyDOMElement()
    ;(useLoggedInUser as any).mockReturnValue({
      user: { id: 1, name: 'John Doe' },
      isLoading: true,
    })

    const { container: loadingContainer } = render(
      <MemoryRouter>
        <InventorPhase3 />
      </MemoryRouter>
    )

    expect(loadingContainer).toBeEmptyDOMElement()
  })
})
