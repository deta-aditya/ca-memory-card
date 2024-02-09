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

