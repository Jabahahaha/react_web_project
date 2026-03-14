import { describe, it, expect } from "vitest"
import { getWinner, formatScore, filterGames, sampleGames } from "./scoreboard"
import type { Game } from "./types"

const makeGame = (overrides: Partial<Game> = {}): Game => ({
  id: 99,
  sport: "football",
  status: "finished",
  homeTeam: { name: "Home", score: 3 },
  awayTeam: { name: "Away", score: 1 },
  startTime: "20:00",
  ...overrides,
})

describe("getWinner", () => {
  it("returns home team when home score is higher", () => {
    const game = makeGame({
      homeTeam: { name: "Home", score: 5 },
      awayTeam: { name: "Away", score: 2 },
    })
    expect(getWinner(game)).toBe("Home")
  })

  it("returns away team when away score is higher", () => {
    const game = makeGame({
      homeTeam: { name: "Home", score: 1 },
      awayTeam: { name: "Away", score: 4 },
    })
    expect(getWinner(game)).toBe("Away")
  })

  it("returns Draw when scores are equal", () => {
    const game = makeGame({
      homeTeam: { name: "Home", score: 2 },
      awayTeam: { name: "Away", score: 2 },
    })
    expect(getWinner(game)).toBe("Draw")
  })

  it("returns null for live games", () => {
    const game = makeGame({ status: "live" })
    expect(getWinner(game)).toBeNull()
  })

  it("returns null for scheduled games", () => {
    const game = makeGame({ status: "scheduled" })
    expect(getWinner(game)).toBeNull()
  })
})

describe("formatScore", () => {
  it("returns 'vs' for scheduled games", () => {
    const game = makeGame({ status: "scheduled" })
    expect(formatScore(game)).toBe("vs")
  })

  it("returns score string for live games", () => {
    const game = makeGame({
      status: "live",
      homeTeam: { name: "A", score: 2 },
      awayTeam: { name: "B", score: 1 },
    })
    expect(formatScore(game)).toBe("2 - 1")
  })

  it("returns score string for finished games", () => {
    const game = makeGame({
      homeTeam: { name: "A", score: 3 },
      awayTeam: { name: "B", score: 3 },
    })
    expect(formatScore(game)).toBe("3 - 3")
  })
})

describe("filterGames", () => {
  it("returns all games when both filters are 'all'", () => {
    expect(filterGames(sampleGames, "all", "all")).toEqual(sampleGames)
  })

  it("filters by sport", () => {
    const result = filterGames(sampleGames, "football", "all")
    expect(result.every((g) => g.sport === "football")).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it("filters by status", () => {
    const result = filterGames(sampleGames, "all", "live")
    expect(result.every((g) => g.status === "live")).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it("filters by both sport and status", () => {
    const result = filterGames(sampleGames, "football", "live")
    expect(
      result.every((g) => g.sport === "football" && g.status === "live"),
    ).toBe(true)
  })

  it("returns empty array when no games match", () => {
    const games = [makeGame({ sport: "football" })]
    expect(filterGames(games, "basketball", "all")).toEqual([])
  })
})

describe("sampleGames", () => {
  it("contains 8 games", () => {
    expect(sampleGames).toHaveLength(8)
  })

  it("has unique ids", () => {
    const ids = sampleGames.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
