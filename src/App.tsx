import Container from "@mui/material/Container"
import GameList from "./GameList"
import ScoreboardHeader from "./ScoreboardHeader"
import { sampleGames } from "./scoreboard"

const liveCount = sampleGames.filter((g) => g.status === "live").length

const App: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ScoreboardHeader liveCount={liveCount} />
      <GameList games={sampleGames} />
    </Container>
  )
}

export default App
