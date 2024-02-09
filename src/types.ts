import { Ref } from "vue";
import { Action } from "./core/entities/action";
import { Card } from "./core/entities/card";
import { Game } from "./core/entities/game";
import { GameCard } from "./core/entities/gameCard";

export type AppContextValue = {
  state: Ref<{ game: Game }>;
  startGame: () => void;
  selectCard: (card: Card) => void;
  resetGame: () => void;
}

export type PlayingOrMatchingGame = {
  kind: 'playing' | 'matching',
  actions: Action[],
  cards: GameCard[],
  score: number,
}

export type WonGame = {
  kind: 'won'
  score: number,
}
