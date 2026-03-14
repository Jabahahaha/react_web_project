import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ScoreboardHeader from "./ScoreboardHeader"

describe("ScoreboardHeader", () => {
  it("renders the title", () => {
    render(<ScoreboardHeader liveCount={0} />)
    expect(screen.getByText("Sports Scoreboard")).toBeInTheDocument()
  })

  it("shows no live games message when count is 0", () => {
    render(<ScoreboardHeader liveCount={0} />)
    expect(screen.getAllByText(/no live games/i).length).toBeGreaterThanOrEqual(
      1,
    )
  })

  it("shows singular live game message when count is 1", () => {
    render(<ScoreboardHeader liveCount={1} />)
    expect(
      screen.getAllByText(/1 game live now/).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it("shows plural live games message when count > 1", () => {
    render(<ScoreboardHeader liveCount={3} />)
    expect(
      screen.getAllByText(/3 games live now/).length,
    ).toBeGreaterThanOrEqual(1)
  })
})
