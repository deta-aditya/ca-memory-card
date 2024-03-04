import { Card, Cards } from "./card"
import { Plainable } from "./plain";

export type GameCard = {
  card: Card;
  state: 'matched' | 'selected' | 'mystery' | 'matching-correctly' | 'matching-incorrectly'
}

export function makeMystery(cards: Card[]): GameCard[] {
  return cards.map(card => ({
    card,
    state: 'mystery',
  }));
}

export class GameCard0 implements Plainable {
  constructor(
    private card: Card,
    private state: 'matched' | 'selected' | 'mystery' | 'matching-correctly' | 'matching-incorrectly',
  ) {}

  mystify() {
    return new GameCard0(this.card, 'mystery');
  }

  plain() {
    return {
      state: this.state,
      card: this.card,
    }
  }
}

export class GameCards implements Plainable {
  constructor(
    private gameCards: GameCard0[],
  ) {}

  static ofCards(cards: Cards) {
    const gameCards = cards
      .list()
      .map(card => new GameCard0(card, 'mystery'));

    return new GameCards(gameCards);
  }

  mystify(): GameCards {
    const newCards = this.gameCards.map(card => card.mystify());
    return new GameCards(newCards);
  }

  list(): GameCard0[] {
    return this.gameCards;
  }

  plain() {
    return this.gameCards.map(gameCard => gameCard.plain());
  }
}