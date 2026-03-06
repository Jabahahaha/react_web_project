import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "./App"

describe("App (layout)", () => {
  it("renders the app bar with title", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText("Sports Scoreboard")).toBeInTheDocument()
  })

  it("renders the Home nav link pointing to /", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole("link", { name: "Home" })
    expect(links.length).toBeGreaterThanOrEqual(1)
    expect(links[0]).toHaveAttribute("href", "/")
  })
})
