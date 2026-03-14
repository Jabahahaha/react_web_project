import type { GameStatus } from "./types"

export const statusColor: Record<GameStatus, "error" | "info" | "default"> = {
  live: "error",
  scheduled: "info",
  finished: "default",
}
