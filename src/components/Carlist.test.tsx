import { describe, expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom/vitest'
import { Carlist } from './Carlist'
import { render, screen, waitFor } from '@testing-library/react'
import { server } from '../mocks/node'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('Carlist tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('component renders', () => {
    // The wrapper wraps the Carlist component
    render(<Carlist />, { wrapper })
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  test('Cars are fetched', async () => {
    render(<Carlist />, { wrapper })
    await waitFor(() => screen.getByText(/New Car/i))
    expect(screen.getByText(/Toyota/i)).toBeInTheDocument()
  })
})
