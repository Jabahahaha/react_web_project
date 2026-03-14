import { Suspense } from "react"
import Container from "@mui/material/Container"
import ErrorBoundary from "../../shared/components/ErrorBoundary"
import LoadingSpinner from "../../shared/components/LoadingSpinner"
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

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ErrorBoundary>
        <FilterProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <GamesContent />
          </Suspense>
        </FilterProvider>
      </ErrorBoundary>
    </Container>
  )
}

export default HomePage
