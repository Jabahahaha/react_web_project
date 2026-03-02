import { formatScore, getWinner } from "./scoreboard"
import type { Game } from "./scoreboard"

interface GameCardProps {
  game: Game
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const winner = getWinner(game)

  return (
    <div className="game-card">
      <div className="game-card-header">
        <span className="game-sport">{game.sport}</span>
        <span className={`game-status game-status--${game.status}`}>
          {game.status}
        </span>
      </div>
      <div className="game-card-teams">
        <span className="team-name">{game.homeTeam.name}</span>
        <span className="game-score">{formatScore(game)}</span>
        <span className="team-name">{game.awayTeam.name}</span>
      </div>
      <div className="game-card-footer">
        <span className="game-time">Start: {game.startTime}</span>
        {winner && <span className="game-winner">Winner: {winner}</span>}
      </div>
    </div>
  )
}

export default GameCard
