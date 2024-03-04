import { Game } from "./game";
import { InputPort, OutputPort } from "./ports";

type MatchCardRequest = Game;

type MatchCardResponse = Game;

export type MatchCardOutputPort = OutputPort<MatchCardResponse>;

export type MatchCardInputPort = InputPort<MatchCardRequest, MatchCardResponse>;

export const matchCard: MatchCardInputPort = (game, next) => {
  if (game.kind !== 'matching') {
    return;
  }

  let newScore = game.score;
  if (game.cards.some(gameCard => gameCard.state === 'matching-correctly')) {
    newScore += 5;
  } else if (game.cards.some(gameCard => gameCard.state === 'matching-incorrectly')) {
    newScore = Math.max(0, newScore - 1);
  }

  const newCards = game.cards.map(gameCard => {
    if (gameCard.state === 'matching-correctly') {
      return { ...gameCard, state: 'matched' as const }
    }
    if (gameCard.state === 'matching-incorrectly') {
      return { ...gameCard, state: 'mystery' as const }
    }
    return gameCard;
  })

  if (newCards.every(gameCard => gameCard.state === 'matched')) {
    next({
      kind: 'won',
      score: newScore,
    });
    return;
  }

  next({
    ...game,
    kind: 'playing',
    cards: newCards,
    score: newScore,
  })
}
