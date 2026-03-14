import { Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { useFavorites } from "../../hooks/useFavorites"
import { formatScore, getWinner } from "../../scoreboard"
import type { Game } from "../../types"

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
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(game.id)

  return (
    <Card variant="outlined">
      <CardActionArea component={RouterLink} to={`/game/${game.id}`}>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton
                size="small"
                aria-label={
                  favorited ? "Remove from favorites" : "Add to favorites"
                }
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(game.id)
                }}
                sx={{ color: favorited ? "secondary.main" : "text.secondary" }}
              >
                {favorited ? "\u2605" : "\u2606"}
              </IconButton>
              <Chip
                label={game.status}
                size="small"
                color={statusColor[game.status]}
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              />
            </Box>
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
      </CardActionArea>
    </Card>
  )
}

export default GameCard
