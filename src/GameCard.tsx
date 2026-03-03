import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { formatScore, getWinner } from "./scoreboard"
import type { Game } from "./scoreboard"

interface GameCardProps {
  game: Game
}

const statusColor: Record<string, "error" | "info" | "default"> = {
  live: "error",
  scheduled: "info",
  finished: "default",
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const winner = getWinner(game)

  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ textTransform: "capitalize" }}
            color="text.secondary"
          >
            {game.sport}
          </Typography>
          <Chip
            label={game.status}
            size="small"
            color={statusColor[game.status]}
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {game.homeTeam.name}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {formatScore(game)}
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {game.awayTeam.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Start: {game.startTime}
          </Typography>
          {winner && (
            <Typography variant="caption" color="text.secondary">
              Winner: {winner}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default GameCard
