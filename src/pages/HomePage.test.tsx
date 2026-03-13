import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FavoritesProvider } from "../context/FavoritesProvider"
import HomePage from "./HomePage"

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  )
}

describe("HomePage", () => {
  it("renders the scoreboard header after loading", async () => {
    render(<HomePage />, { wrapper: createWrapper() })
    expect(await screen.findByText("Sports Scoreboard")).toBeInTheDocument()
  })

  it("renders game cards from fetched data", async () => {
    render(<HomePage />, { wrapper: createWrapper() })
    expect(await screen.findByText("Barcelona")).toBeInTheDocument()
    expect(screen.getByText("Lakers")).toBeInTheDocument()
  })

  it("shows live game count", async () => {
    render(<HomePage />, { wrapper: createWrapper() })
    expect(await screen.findByText(/games live now/)).toBeInTheDocument()
  })

  it("shows a loading indicator while fetching", () => {
    render(<HomePage />, { wrapper: createWrapper() })
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
