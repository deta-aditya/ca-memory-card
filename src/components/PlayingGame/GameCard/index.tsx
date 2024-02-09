import classNames from "classnames";
import { useAppContext } from "../../../contexts/appContext";
import { GameCard } from "../../../core/entities/gameCard"

export type GameCardProps = GameCard;

function GameCard({ card, state }: GameCardProps) {
  const app = useAppContext();

  return (
    <div
      className={classNames('game-card', {
        matched: state === 'matched',
        colored: card.suit === 'diamond' || card.suit === 'heart',
        selected: state === 'selected',
        'matching-incorrectly': state === 'matching-incorrectly',
        'matching-correctly': state === 'matching-correctly',
      })}
      onClick={() => app.selectCard(card)}
    >
      {state !== 'mystery' && (
        <>
          {card.rank}{' '}
          {card.suit === 'diamond' && <>&diams;</>}
          {card.suit === 'club' && <>&clubs;</>}
          {card.suit === 'heart' && <>&hearts;</>}
          {card.suit === 'spade' && <>&spades;</>}
        </>
      )}
    </div>
  )
}

export default GameCard;
