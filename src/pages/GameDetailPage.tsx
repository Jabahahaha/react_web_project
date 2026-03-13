import { Suspense } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { formatScore, getWinner } from "../scoreboard"
import { useFavorites } from "../hooks/useFavorites"
import { useGame } from "../hooks/useGames"
import ErrorBoundary from "../components/ErrorBoundary"

const statusColor: Record<string, "error" | "info" | "default"> = {
  live: "error",
  scheduled: "info",
  finished: "default",
}

const GameContent: React.FC<{ id: number }> = ({ id }) => {
  const { data: game } = useGame(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!game) {
    return (
      <>
        <Typography variant="h5">Game not found</Typography>
        <Button component={RouterLink} to="/" sx={{ mt: 2 }}>
          Back to Scoreboard
        </Button>
      </>
    )
  }

  const winner = getWinner(game)
  const favorited = isFavorite(game.id)

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button component={RouterLink} to="/">
          &larr; Back to Scoreboard
        </Button>
        <Button
          variant={favorited ? "contained" : "outlined"}
          color="secondary"
          onClick={() => toggleFavorite(game.id)}
        >
          {favorited ? "\u2605 Favorited" : "\u2606 Favorite"}
        </Button>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="overline"
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

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              {game.homeTeam.name}
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>
              {formatScore(game)}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
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
            <Typography variant="body2" color="text.secondary">
              Start time: {game.startTime}
            </Typography>
            {winner && (
              <Typography variant="body2" color="text.secondary">
                Winner: {winner}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

const LoadingFallback: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
    <CircularProgress />
  </Box>
)

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  if (!id || isNaN(numericId)) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h5">Invalid game ID</Typography>
        <Button component={RouterLink} to="/" sx={{ mt: 2 }}>
          Back to Scoreboard
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <GameContent id={numericId} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}

export default GameDetailPage
