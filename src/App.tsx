import GameList from "./GameList"
import ScoreboardHeader from "./ScoreboardHeader"
import { sampleGames } from "./scoreboard"

const liveCount = sampleGames.filter((g) => g.status === "live").length

const App: React.FC = () => {
  return (
    <>
      <ScoreboardHeader liveCount={liveCount} />
      <GameList games={sampleGames} />
    </>
  )
}

export default App
