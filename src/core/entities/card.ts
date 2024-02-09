export type Card = {
  suit: 'diamond' | 'club' | 'heart' | 'spade',
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A',
}

const SUITS: Array<Card['suit']> = ['diamond', 'club', 'heart', 'spade'];
const RANKS: Array<Card['rank']> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function shuffledCards() {
  const unshuffled = SUITS.flatMap(suit => {
    return RANKS.map(rank => ({
      suit, rank,
    }));
  });

  const shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffled;
}

export function isEqual(card1: Card, card2: Card) {
  return hasSameRank(card1, card2) && card1.suit === card2.suit;
}

export function hasSameRank(card1: Card, card2: Card) {
  return card1.rank === card2.rank;
}