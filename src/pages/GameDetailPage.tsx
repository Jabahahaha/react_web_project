import { useParams, Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { sampleGames, formatScore, getWinner } from "../scoreboard"

const statusColor: Record<string, "error" | "info" | "default"> = {
  live: "error",
  scheduled: "info",
  finished: "default",
}

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const game = sampleGames.find((g) => g.id === Number(id))

  if (!game) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5">Game not found</Typography>
        <Button component={RouterLink} to="/" sx={{ mt: 2 }}>
          Back to Scoreboard
        </Button>
      </Container>
    )
  }

  const winner = getWinner(game)

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/" sx={{ mb: 3 }}>
        &larr; Back to Scoreboard
      </Button>

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
    </Container>
  )
}

export default GameDetailPage
