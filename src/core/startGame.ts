import { Game } from "./entities/game";
import { shuffledCards } from "./entities/card";
import { InputPort, OutputPort } from "./entities/ports";
import { makeMystery } from "./entities/gameCard";

type StartGameRequest = null;

type StartGameResponse = Game

export type StartGameOutputPort = OutputPort<StartGameResponse>;

export type StartGameInputPort = InputPort<StartGameRequest, StartGameResponse>;

export const startGame: StartGameInputPort = (_, next) => {
  const cards = shuffledCards();

  next({
    kind: 'playing',
    actions: [],
    cards: makeMystery(cards),
    score: 200,
  });
}

export interface StartGameInputPort2 {
  interact(request: StartGameRequest): void;
}

export interface StartGameOutputPort2 {
  next(response: StartGameResponse): void;
}

export interface SaveGameCommand {
  saveGame(game: Game): Promise<void>;
}

export class StartGame implements StartGameInputPort2 {
  private output: StartGameOutputPort2;
  private saveGameCommand: SaveGameCommand;

  interact(request: StartGameRequest) {
    const cards = shuffledCards();
    this.saveGameCommand.saveGame({
      kind: 'playing',
      actions: [],
      cards: makeMystery(cards),
      score: 200,
    })
    this.output.next(cards);
  }
}
