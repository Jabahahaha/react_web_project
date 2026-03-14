import { useCallback, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { FavoritesContext } from "./FavoritesContext"

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const toggleFavorite = useCallback((gameId: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(gameId)) {
        next.delete(gameId)
      } else {
        next.add(gameId)
      }
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (gameId: number) => favorites.has(gameId),
    [favorites],
  )

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
