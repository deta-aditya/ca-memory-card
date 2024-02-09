import { Card } from "./card"

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
