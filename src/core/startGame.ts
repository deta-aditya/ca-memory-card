import { Game, IGame } from "./game";
import { shuffledCards } from "./card";
import { InputPort, OutputPort } from "./ports";
import { makeMystery } from "./gameCard";

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

export type StartGameRequest2 = IGame;
export type StartGameResponse2 = IGame;

export interface StartGameInputPort2 {
  interact(request: StartGameRequest2): void;
}

export interface StartGameOutputPort2 {
  next(response: StartGameResponse2): void;
}

export interface GetCurrentGameQuery {
  getCurrentGame(): Promise<IGame>;
}

export interface SaveGameCommand {
  saveGame(game: IGame): Promise<void>;
}

export class End {
  next() {}
}

export class Pivot<TResponse, TInteractor extends { interact: (arg: TResponse) => void}> {
  constructor(
    private interactor: TInteractor,
  ) {}

  next(response: TResponse) {
    this.interactor.interact(response);
  }
}

export class GetCurrentGame {
  constructor(
    private output: { next: (game: IGame) => void },
    private getCurrentGameQuery: GetCurrentGameQuery,
  ) {}

  async interact() {
    const currentGame = await this.getCurrentGameQuery.getCurrentGame();
    this.output.next(currentGame);
  }
}

export class SaveGame {
  constructor(
    private output: { next: (game: IGame) => void },
    private saveGameCommand: SaveGameCommand,
  ) {}

  async interact(game: IGame) {
    this.saveGameCommand.saveGame(game);
    this.output.next(game);
  }
}

export class StartGame implements StartGameInputPort2 {
  constructor(  
    private output: StartGameOutputPort2,
  ) {}

  async interact(game: IGame) {
    const startedGame = game.start();
    this.output.next(startedGame);
  }
}
