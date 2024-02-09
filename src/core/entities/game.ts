import { Action } from "./action";
import { GameCard } from "./gameCard";

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
