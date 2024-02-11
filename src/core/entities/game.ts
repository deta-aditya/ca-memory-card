import { Action } from "./action";
import { shuffledCards } from "./card";
import { GameCard, makeMystery } from "./gameCard";

export type Game =
  | { kind: 'not-started' } 
  | { 
      kind: 'playing' | 'matching',
      actions: Action[],
      cards: GameCard[],
      score: number,
    }
  | { 
      kind: 'won',
      score: number,
    };

interface GameState {
  kind: 'not-started' | 'playing' | 'won',
}

class NotStarted implements GameState {
  get kind() {
    return 'not-started' as const
  }

  start() {
    
  }
}

export class Gamee {
  private state: Game;

  constructor(state: Game) {
    this.state = state;
  }

  static initial() {
    return new Gamee({
      kind: 'not-started',
    });
  }

  start() {
    const cards = shuffledCards();
    const mysteryCards = makeMystery(cards);
    return new Gamee({
      kind: 'playing',
      actions: [],
      cards: mysteryCards,
      score: 200,
    })
  }

  match<T>(matchers: { notStarted: () => T, playing: () => T, won: () => T }): T {
    switch (this.state.kind) {
      case 'not-started':
        return matchers.notStarted();
      case 'playing':
        return matchers.playing();
      case 'won':
        return matchers.won();
      default:
        throw new Error('Impossible game state!');
    } 
  }
}

// export class NotStarted {
// }

// export class Playing {
//   private providedCards: GameCard[];

//   actions(): Action[] {
//     return [];
//   }

//   cards(): GameCard[] {
//     return this.providedCards;
//   }

//   score(): number {
//     return 200;
//   }
// }