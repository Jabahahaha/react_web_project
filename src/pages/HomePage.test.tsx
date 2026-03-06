import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import HomePage from "./HomePage"

describe("HomePage", () => {
  it("renders the scoreboard header", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByText("Sports Scoreboard")).toBeInTheDocument()
  })

  it("renders game cards from sample data", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getAllByText("Barcelona").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("Lakers").length).toBeGreaterThanOrEqual(1)
  })

  it("shows live game count", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getAllByText(/games live now/).length).toBeGreaterThanOrEqual(
      1,
    )
  })
})
