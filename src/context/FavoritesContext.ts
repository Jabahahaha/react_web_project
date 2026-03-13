import { createContext } from "react"

export interface FavoritesState {
  favorites: Set<number>
  toggleFavorite: (gameId: number) => void
  isFavorite: (gameId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesState | null>(null)
