import { createContext } from "react"
import type { GameStatus, Sport } from "../types"

export interface FilterState {
  sport: Sport | "all"
  status: GameStatus | "all"
  setSport: (sport: Sport | "all") => void
  setStatus: (status: GameStatus | "all") => void
}

export const FilterContext = createContext<FilterState | null>(null)
