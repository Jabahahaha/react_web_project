import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FavoritesProvider } from "../context/FavoritesProvider"
import GameDetailPage from "./GameDetailPage"

const renderAtRoute = (path: string) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/game/:id" element={<GameDetailPage />} />
          </Routes>
        </MemoryRouter>
      </FavoritesProvider>
    </QueryClientProvider>,
  )
}

describe("GameDetailPage", () => {
  it("renders game details for a valid id", async () => {
    renderAtRoute("/game/1")
    expect(await screen.findByText("Barcelona")).toBeInTheDocument()
    expect(screen.getByText("Real Madrid")).toBeInTheDocument()
    expect(screen.getByText("0 - 4")).toBeInTheDocument()
  })

  it("shows 'Game not found' for invalid id", async () => {
    renderAtRoute("/game/999")
    expect(await screen.findByText("Game not found")).toBeInTheDocument()
  })

  it("shows back to scoreboard link", async () => {
    renderAtRoute("/game/1")
    await screen.findByText("Barcelona")
    const backLinks = screen.getAllByRole("link")
    const backLink = backLinks.find((l) => l.getAttribute("href") === "/")
    expect(backLink).toBeDefined()
  })

  it("shows winner for finished games", async () => {
    renderAtRoute("/game/2")
    expect(await screen.findByText("Winner: Lakers")).toBeInTheDocument()
  })

  it("does not show winner for live games", async () => {
    renderAtRoute("/game/1")
    await screen.findByText("Barcelona")
    expect(screen.queryByText(/Winner:/)).not.toBeInTheDocument()
  })

  it("displays the sport label", async () => {
    renderAtRoute("/game/1")
    expect(await screen.findByText("football")).toBeInTheDocument()
  })

  it("displays the start time", async () => {
    renderAtRoute("/game/1")
    expect(await screen.findByText(/Start time: 20:00/)).toBeInTheDocument()
  })

  it("shows a loading indicator while fetching", () => {
    renderAtRoute("/game/1")
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
