import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import GameCard from "./GameCard"
import type { Game } from "./scoreboard"

const renderWithRouter = (game: Game) =>
  render(
    <MemoryRouter>
      <GameCard game={game} />
    </MemoryRouter>,
  )

describe("GameCard", () => {
  const liveGame: Game = {
    id: 1,
    sport: "football",
    status: "live",
    homeTeam: { name: "Barcelona", score: 2 },
    awayTeam: { name: "Real Madrid", score: 1 },
    startTime: "20:00",
  }

  const finishedGame: Game = {
    id: 2,
    sport: "basketball",
    status: "finished",
    homeTeam: { name: "Lakers", score: 110 },
    awayTeam: { name: "Celtics", score: 105 },
    startTime: "18:00",
  }

  const scheduledGame: Game = {
    id: 3,
    sport: "tennis",
    status: "scheduled",
    homeTeam: { name: "Djokovic", score: 0 },
    awayTeam: { name: "Alcaraz", score: 0 },
    startTime: "14:00",
  }

  it("renders team names", () => {
    renderWithRouter(liveGame)
    expect(screen.getByText("Barcelona")).toBeInTheDocument()
    expect(screen.getByText("Real Madrid")).toBeInTheDocument()
  })

  it("shows the score for live games", () => {
    renderWithRouter(liveGame)
    expect(screen.getAllByText("2 - 1").length).toBeGreaterThanOrEqual(1)
  })

  it("shows 'vs' for scheduled games", () => {
    renderWithRouter(scheduledGame)
    expect(screen.getByText("vs")).toBeInTheDocument()
  })

  it("shows winner for finished games", () => {
    renderWithRouter(finishedGame)
    expect(screen.getByText("Winner: Lakers")).toBeInTheDocument()
  })

  it("does not show winner for live games", () => {
    renderWithRouter(liveGame)
    expect(screen.queryByText(/Winner:/)).not.toBeInTheDocument()
  })

  it("shows the sport name", () => {
    renderWithRouter(liveGame)
    expect(screen.getAllByText("football").length).toBeGreaterThanOrEqual(1)
  })

  it("shows the game status chip", () => {
    renderWithRouter(liveGame)
    expect(screen.getAllByText("live").length).toBeGreaterThanOrEqual(1)
  })

  it("links to the game detail page", () => {
    renderWithRouter(liveGame)
    const links = screen.getAllByRole("link")
    expect(links[0]).toHaveAttribute("href", "/game/1")
  })
})
