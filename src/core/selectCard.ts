import { Card, hasSameRank, isEqual } from "./entities/card";
import { Game } from "./entities/game";
import { InputPort, OutputPort } from "./entities/ports";

type SelectCardRequest = {
  game: Game;
  card: Card;
};

type SelectCardResponse = Game;

export type SelectCardOutputPort = OutputPort<SelectCardResponse>;

export type SelectCardInputPort = InputPort<SelectCardRequest, SelectCardResponse>;

export const selectCard: SelectCardInputPort = ({ game, card }, next) => {
  if (game.kind !== 'playing') {
    return;
  }

  const newCards = game.cards.map(gameCard => {
    if (gameCard.state === 'mystery' && isEqual(gameCard.card, card)) {
      return { ...gameCard, state: 'selected' as const };
    }
    return gameCard;
  });

  let matchedCards = newCards;
  let newGameKind: Game['kind'] = 'playing';

  const selectedCards = newCards.filter(card => card.state === 'selected');
  if (selectedCards.length === 2) {
    const [selectedCard1, selectedCard2] = selectedCards;

    newGameKind = 'matching';
    matchedCards = newCards.map(gameCard => {
      if (isEqual(gameCard.card, selectedCard1.card) || isEqual(gameCard.card, selectedCard2.card)) {
        if (hasSameRank(selectedCard1.card, selectedCard2.card)) {
          return { ...gameCard, state: 'matching-correctly' as const };
        }
        return { ...gameCard, state: 'matching-incorrectly' as const };
      }
      return gameCard;
    });
  } 

  const newGame = { ...game, kind: newGameKind, cards: matchedCards }

  next(newGame);
}
