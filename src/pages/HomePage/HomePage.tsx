import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import ErrorBoundary from "../../shared/components/ErrorBoundary"
import { FilterProvider } from "../../games/context/FilterProvider"
import GameList from "../../games/components/GameList"
import ScoreboardHeader from "../../games/components/ScoreboardHeader"
import { useGames } from "../../games/hooks/useGames"

const GamesContent: React.FC = () => {
  const { data: games } = useGames()
  const liveCount = games.filter((g) => g.status === "live").length

  return (
    <>
      <ScoreboardHeader liveCount={liveCount} />
      <GameList games={games} />
    </>
  )
}

const LoadingFallback: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
    <CircularProgress />
  </Box>
)

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ErrorBoundary>
        <FilterProvider>
          <Suspense fallback={<LoadingFallback />}>
            <GamesContent />
          </Suspense>
        </FilterProvider>
      </ErrorBoundary>
    </Container>
  )
}

export default HomePage
