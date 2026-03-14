import { useSuspenseQuery } from "@tanstack/react-query"
import { fetchGames, fetchGameById } from "../api/games"

export function useGames() {
  return useSuspenseQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  })
}

export function useGame(id: number) {
  return useSuspenseQuery({
    queryKey: ["games", id],
    queryFn: () => fetchGameById(id),
  })
}
