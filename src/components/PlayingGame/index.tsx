import { Game } from "../../core/entities/game";
import GameCard from "./GameCard";

export type PlayingGameProps = Extract<Game, { kind: 'playing' | 'matching' }>

function PlayingGame({ cards, score }: PlayingGameProps) {
  return (
    <div className="playing-game">
      <div className="header">
        <div className="score">
          <span className="score-label">Score</span>
          <span className="score-value">{score}</span>
        </div>
      </div>
      <div className="table">
        {cards.map(gameCard => (
          <GameCard
            key={`${gameCard.card.rank}-${gameCard.card.suit}`}
            state={gameCard.state}
            card={gameCard.card}
          />
        ))}
      </div>
    </div>
  )
}

export default PlayingGame;
