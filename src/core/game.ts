import { Action } from "./action";
import { Cards } from "./card";
import { GameCard, GameCards } from "./gameCard";
import { Plain, Plainable } from "./plain";

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

export interface GameFactory {
  fromPlain(plain: Plain): IGame;
}

export interface IGame extends Plainable {
  start(): IGame;
}

// export const IGame = {
//   // Doing this is a pain. I suggest using zod or something.
//   fromPlain(plain: Plain): IGame {
//     if (!Plain.isObject(plain)) {
//       throw new InvalidPlainGameException('Plain data received is not an object');
//     }

//     if (!Plain.hasKey(plain, 'kind') || !Plain.isString(plain.kind)) {
//       throw new InvalidPlainGameException('Plain object does not have a valid "kind" property');
//     }

//     if (!Plain.isOneOf(plain.kind, ['not-started', 'playing', 'won'])) {
//       throw new InvalidPlainGameException('Plain object\'s "kind" object is not "not-started", "playing", nor "won"');
//     }

//     if (plain.kind === 'not-started') {
//       return new NotStarted();
//     }

//     if (plain.kind === 'won') {
//       const baseErrorMessage = 'Plain object is kind of "won" but ';
//       if (!Plain.isNumber(plain.score)) {
//         throw new InvalidPlainGameException(baseErrorMessage + 'it has an invalid "score" property');
//       }

//       return new Won(plain.score);
//     }

//     if (plain.kind === 'playing') {
//       const baseErrorMessage = 'Plain object is kind of "playing" but ';
//       if (!Plain.isArray(plain.actions)) {
//         throw new InvalidPlainGameException(baseErrorMessage + 'it has an invalid "actions" property');
//       }
      
//       if (!Plain.isNumber(plain.score)) {
//         throw new InvalidPlainGameException(baseErrorMessage + 'it has an invalid "score" property');
//       }

//       if (!Plain.isArray(plain.cards)) {
//         throw new InvalidPlainGameException(baseErrorMessage + 'it has an invalid "cards" property');
//       }

//       const gameCardErrorMessage = baseErrorMessage + 'one of the cards ';
//       for (const gameCard of plain.cards) {
//         if (!Plain.isObject(gameCard)) {
//           throw new InvalidPlainGameException(gameCardErrorMessage + 'is not an object');
//         }

//         if (!Plain.hasKey(gameCard, 'state') || !Plain.isString(gameCard.state)) {
//           throw new InvalidPlainGameException(gameCardErrorMessage + 'does not have a valid "state" property');
//         }

//         if (!Plain.isOneOf(plain.kind, ['matched', 'selected', 'mystery', 'matching-correctly', 'matching-incorrectly'])) {
//           throw new InvalidPlainGameException(gameCardErrorMessage + 'does not have a valid "state" value');
//         }

//         if (!Plain.hasKey(gameCard, 'card')) {
          
//         }
//       }
//     }

//     throw new InvalidPlainGameException('Plain object does not have a valid shape');
//   }
// }

export class InvalidPlainGameException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotStarted implements IGame {
  start(): IGame {
    const cards = Cards.fresh();
    const shuffledCards = cards.shuffle();
    const gameCards = GameCards.ofCards(shuffledCards); 

    return Playing.initial(gameCards);
  }

  plain() {
    return { kind: 'not-started' };
  }
}

export class Playing implements IGame {
  constructor(
    private _actions: Action[],
    private _cards: GameCards,
    private _score: number,
  ) {}

  static initial(cards: GameCards) {
    return new Playing([], cards, 200);
  }

  start(): IGame {
    return this;
  }

  actions(): Action[] {
    return this._actions;
  }

  cards(): GameCards {
    return this._cards;
  }

  score(): number {
    return this._score;
  }

  plain() {
    return {
      kind: 'playing',
      actions: this._actions,
      cards: this._cards.plain(),
      score: this._score,
    };
  }
}

export class Won implements IGame {
  constructor(
    private _score: number
  ) {}

  start(): IGame {
    return this;
  }

  score(): number {
    return this._score;
  }

  plain() {
    return { 
      kind: 'won',
      score: this._score,
    };
  }
}
