import { MatchCardInputPort, matchCard } from "./matchCard";
import { SelectCardInputPort, selectCard } from "./selectCard";
import { StartGameInputPort, startGame } from "./startGame";

export type App = {
  startGame: StartGameInputPort
  selectCard: SelectCardInputPort
  matchCard: MatchCardInputPort
}

export function createApp() {
  return {
    startGame: startGame,
    selectCard: selectCard,
    matchCard: matchCard,
  }
}
