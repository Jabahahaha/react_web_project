import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { FavoritesProvider } from "./context/FavoritesProvider"
import { FilterProvider } from "./context/FilterProvider"
import GameList from "./GameList"
import type { Game } from "./scoreboard"

const games: Game[] = [
  {
    id: 1,
    sport: "football",
    status: "live",
    homeTeam: { name: "Team A", score: 1 },
    awayTeam: { name: "Team B", score: 0 },
    startTime: "20:00",
  },
  {
    id: 2,
    sport: "basketball",
    status: "finished",
    homeTeam: { name: "Team C", score: 100 },
    awayTeam: { name: "Team D", score: 90 },
    startTime: "18:00",
  },
  {
    id: 3,
    sport: "football",
    status: "finished",
    homeTeam: { name: "Team E", score: 2 },
    awayTeam: { name: "Team F", score: 2 },
    startTime: "17:00",
  },
  {
    id: 4,
    sport: "basketball",
    status: "scheduled",
    homeTeam: { name: "Team G", score: 0 },
    awayTeam: { name: "Team H", score: 0 },
    startTime: "22:00",
  },
]

const renderWithRouter = (g: Game[]) =>
  render(
    <FavoritesProvider>
      <FilterProvider>
        <MemoryRouter>
          <GameList games={g} />
        </MemoryRouter>
      </FilterProvider>
    </FavoritesProvider>,
  )

describe("GameList", () => {
  it("renders all games", () => {
    renderWithRouter(games)
    expect(screen.getByText("Team A")).toBeInTheDocument()
    expect(screen.getByText("Team C")).toBeInTheDocument()
  })

  it("shows empty message when no games provided", () => {
    renderWithRouter([])
    expect(
      screen.getByText("No games found for the selected filters."),
    ).toBeInTheDocument()
  })

  it("renders sport and status filter controls", () => {
    renderWithRouter(games)
    expect(screen.getAllByText("Sport").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Status").length).toBeGreaterThanOrEqual(1)
  })

  // ---- ADDITIONAL COMPREHENSIVE TEST ----
  // Tests the full filter interaction flow: selecting a sport filter
  // narrows the displayed games, then selecting a status filter
  // narrows further, and resetting both shows all games again.
  it("filters games interactively by sport and status", async () => {
    const user = userEvent.setup()
    renderWithRouter(games)

    const comboboxes = screen.getAllByRole("combobox")
    const sportSelect = comboboxes[0]
    const statusSelect = comboboxes[1]

    // All 4 games visible initially
    expect(screen.getByText("Team A")).toBeInTheDocument()
    expect(screen.getByText("Team C")).toBeInTheDocument()
    expect(screen.getByText("Team E")).toBeInTheDocument()
    expect(screen.getByText("Team G")).toBeInTheDocument()

    // Open the Sport select and pick Football
    await user.click(sportSelect)
    await user.click(within(screen.getByRole("listbox")).getByText("Football"))

    // Only football games visible (Team A, Team E)
    expect(screen.getByText("Team A")).toBeInTheDocument()
    expect(screen.getByText("Team E")).toBeInTheDocument()
    expect(screen.queryByText("Team C")).not.toBeInTheDocument()
    expect(screen.queryByText("Team G")).not.toBeInTheDocument()

    // Now also filter by status: Finished
    await user.click(statusSelect)
    await user.click(within(screen.getByRole("listbox")).getByText("Finished"))

    // Only football + finished visible (Team E)
    expect(screen.getByText("Team E")).toBeInTheDocument()
    expect(screen.queryByText("Team A")).not.toBeInTheDocument()

    // Reset sport to All Sports
    await user.click(sportSelect)
    await user.click(
      within(screen.getByRole("listbox")).getByText("All Sports"),
    )

    // Now all finished games visible (Team C, Team E)
    expect(screen.getByText("Team C")).toBeInTheDocument()
    expect(screen.getByText("Team E")).toBeInTheDocument()
    expect(screen.queryByText("Team A")).not.toBeInTheDocument()

    // Reset status to All
    await user.click(statusSelect)
    await user.click(within(screen.getByRole("listbox")).getByText("All"))

    // All games visible again
    expect(screen.getByText("Team A")).toBeInTheDocument()
    expect(screen.getByText("Team C")).toBeInTheDocument()
    expect(screen.getByText("Team E")).toBeInTheDocument()
    expect(screen.getByText("Team G")).toBeInTheDocument()
  })
})
