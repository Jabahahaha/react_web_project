import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import GameDetailPage from "./GameDetailPage"

const renderAtRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/game/:id" element={<GameDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe("GameDetailPage", () => {
  it("renders game details for a valid id", () => {
    renderAtRoute("/game/1")
    expect(screen.getAllByText("Barcelona").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Real Madrid").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("0 - 4").length).toBeGreaterThanOrEqual(1)
  })

  it("shows 'Game not found' for invalid id", () => {
    renderAtRoute("/game/999")
    expect(screen.getByText("Game not found")).toBeInTheDocument()
  })

  it("shows back to scoreboard link", () => {
    renderAtRoute("/game/1")
    const backLinks = screen.getAllByRole("link")
    const backLink = backLinks.find((l) => l.getAttribute("href") === "/")
    expect(backLink).toBeDefined()
  })

  it("shows winner for finished games", () => {
    renderAtRoute("/game/2")
    expect(screen.getByText("Winner: Lakers")).toBeInTheDocument()
  })

  it("does not show winner for live games", () => {
    renderAtRoute("/game/1")
    expect(screen.queryByText(/Winner:/)).not.toBeInTheDocument()
  })

  it("displays the sport label", () => {
    renderAtRoute("/game/1")
    expect(screen.getAllByText("football").length).toBeGreaterThanOrEqual(1)
  })

  it("displays the start time", () => {
    renderAtRoute("/game/1")
    expect(
      screen.getAllByText(/Start time: 20:00/).length,
    ).toBeGreaterThanOrEqual(1)
  })
})
