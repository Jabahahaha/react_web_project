import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import type { FavoritesState } from "../context/FavoritesContext"

export function useFavorites(): FavoritesState {
  const ctx = useContext(FavoritesContext)
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
