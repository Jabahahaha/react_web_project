export type Sport = "football" | "basketball" | "tennis" | "hockey"

export type GameStatus = "scheduled" | "live" | "finished"

export interface Team {
  name: string
  score: number
}

export interface Game {
  id: number
  sport: Sport
  status: GameStatus
  homeTeam: Team
  awayTeam: Team
  startTime: string
}
