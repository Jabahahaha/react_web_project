import { sampleGames } from "../scoreboard"
import type { Game } from "../types"

const SIMULATED_DELAY_MS = 400

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchGames(): Promise<Game[]> {
  await delay(SIMULATED_DELAY_MS)
  return sampleGames
}

export async function fetchGameById(id: number): Promise<Game | null> {
  await delay(SIMULATED_DELAY_MS)
  return sampleGames.find((g) => g.id === id) ?? null
}
