interface ScoreboardHeaderProps {
  liveCount: number
}

const ScoreboardHeader: React.FC<ScoreboardHeaderProps> = ({ liveCount }) => {
  return (
    <header>
      <h1>Sports Scoreboard</h1>
      <p>
        {liveCount > 0
          ? `${liveCount} game${liveCount !== 1 ? "s" : ""} live now`
          : "No live games right now"}
      </p>
    </header>
  )
}

export default ScoreboardHeader
