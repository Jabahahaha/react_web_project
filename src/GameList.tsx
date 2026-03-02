import { useMemo, useState } from "react"
import GameCard from "./GameCard"
import { filterGames } from "./scoreboard"
import type { Game, GameStatus, Sport } from "./scoreboard"

interface GameListProps {
  games: Game[]
}

const sports: { label: string; value: Sport | "all" }[] = [
  { label: "All Sports", value: "all" },
  { label: "Football", value: "football" },
  { label: "Basketball", value: "basketball" },
  { label: "Tennis", value: "tennis" },
  { label: "Hockey", value: "hockey" },
]

const statuses: { label: string; value: GameStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Finished", value: "finished" },
  { label: "Scheduled", value: "scheduled" },
]

const GameList: React.FC<GameListProps> = ({ games }) => {
  const [selectedSport, setSelectedSport] = useState<Sport | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<GameStatus | "all">(
    "all",
  )

  const filteredGames = useMemo(
    () => filterGames(games, selectedSport, selectedStatus),
    [games, selectedSport, selectedStatus],
  )

  return (
    <section>
      <div className="filters">
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value as Sport | "all")}
        >
          {sports.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value as GameStatus | "all")
          }
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {filteredGames.length === 0 ? (
        <p>No games found for the selected filters.</p>
      ) : (
        <div className="game-list">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}

export default GameList
