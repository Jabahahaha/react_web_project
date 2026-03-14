import { useMemo } from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Typography from "@mui/material/Typography"
import GameCard from "../GameCard"
import { useFilter } from "../../hooks/useFilter"
import { filterGames } from "../../scoreboard"
import type { Game, GameStatus, Sport } from "../../types"

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
  const {
    sport: selectedSport,
    status: selectedStatus,
    setSport: setSelectedSport,
    setStatus: setSelectedStatus,
  } = useFilter()

  const filteredGames = useMemo(
    () => filterGames(games, selectedSport, selectedStatus),
    [games, selectedSport, selectedStatus],
  )

  return (
    <section>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sport</InputLabel>
          <Select
            value={selectedSport}
            label="Sport"
            onChange={(e) => setSelectedSport(e.target.value as Sport | "all")}
          >
            {sports.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Status"
            onChange={(e) =>
              setSelectedStatus(e.target.value as GameStatus | "all")
            }
          >
            {statuses.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredGames.length === 0 ? (
        <Typography color="text.secondary">
          No games found for the selected filters.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Box>
      )}
    </section>
  )
}

export default GameList
