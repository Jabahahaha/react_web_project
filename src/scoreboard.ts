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

export function getWinner(game: Game): string | null {
  if (game.status !== "finished") return null
  if (game.homeTeam.score > game.awayTeam.score) return game.homeTeam.name
  if (game.awayTeam.score > game.homeTeam.score) return game.awayTeam.name
  return "Draw"
}

export function formatScore(game: Game): string {
  if (game.status === "scheduled") return "vs"
  return `${game.homeTeam.score} - ${game.awayTeam.score}`
}

export function filterGames(
  games: Game[],
  sport: Sport | "all",
  status: GameStatus | "all",
): Game[] {
  return games.filter((game) => {
    if (sport !== "all" && game.sport !== sport) return false
    if (status !== "all" && game.status !== status) return false
    return true
  })
}

export const sampleGames: Game[] = [
  {
    id: 1,
    sport: "football",
    status: "live",
    homeTeam: { name: "Barcelona", score: 2 },
    awayTeam: { name: "Real Madrid", score: 1 },
    startTime: "20:00",
  },
  {
    id: 2,
    sport: "basketball",
    status: "finished",
    homeTeam: { name: "Lakers", score: 110 },
    awayTeam: { name: "Celtics", score: 105 },
    startTime: "18:00",
  },
  {
    id: 3,
    sport: "tennis",
    status: "live",
    homeTeam: { name: "Djokovic", score: 2 },
    awayTeam: { name: "Alcaraz", score: 1 },
    startTime: "14:00",
  },
  {
    id: 4,
    sport: "hockey",
    status: "scheduled",
    homeTeam: { name: "Maple Leafs", score: 0 },
    awayTeam: { name: "Canadiens", score: 0 },
    startTime: "21:00",
  },
  {
    id: 5,
    sport: "football",
    status: "finished",
    homeTeam: { name: "Liverpool", score: 3 },
    awayTeam: { name: "Arsenal", score: 3 },
    startTime: "17:30",
  },
  {
    id: 6,
    sport: "basketball",
    status: "scheduled",
    homeTeam: { name: "Warriors", score: 0 },
    awayTeam: { name: "Bucks", score: 0 },
    startTime: "22:00",
  },
  {
    id: 7,
    sport: "tennis",
    status: "finished",
    homeTeam: { name: "Sinner", score: 3 },
    awayTeam: { name: "Medvedev", score: 1 },
    startTime: "12:00",
  },
  {
    id: 8,
    sport: "hockey",
    status: "live",
    homeTeam: { name: "Bruins", score: 4 },
    awayTeam: { name: "Rangers", score: 3 },
    startTime: "19:30",
  },
]
