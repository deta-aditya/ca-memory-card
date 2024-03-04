import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { GameFactory, IGame, NotStarted } from "../core/game";
import { End, GetCurrentGame, GetCurrentGameQuery, Pivot, SaveGame, SaveGameCommand, StartGame } from "../core/startGame";
import { Card } from "../core/card";

type ReactStateCompatibleGame = ReturnType<IGame['plain']>;

type AppContextValue = {
  game: IGame;
  startGame: () => void;
  selectCard: (card: Card) => void;
  resetGame: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider(props: PropsWithChildren) {
  const [state, setState] = useState<ReactStateCompatibleGame>(() => new NotStarted().plain());

  const gameFactory: GameFactory = {
    fromPlain() {
      return new NotStarted();
    },
  }

  const gameObject = gameFactory.fromPlain(state);

  const stateStore = {
    async saveGame(game: IGame) {
      setState(game.plain());
    },
    async getCurrentGame() {
      return gameObject;
    }
  };

  const contextValue: AppContextValue = {
    game: gameObject,
    startGame: () => {
      const saveGame = new SaveGame(new End(), stateStore);
      const startGame = new StartGame(new Pivot(saveGame));
      const getCurrentGame = new GetCurrentGame(new Pivot(startGame), stateStore);

      getCurrentGame.interact();
    }
  }

  useEffect(() => {
    // if (state.kind === 'matching') {
    //   const timeout = setTimeout(() => {
    //     app.matchCard(state, setState);
    //   }, 500)
    //   return () => clearTimeout(timeout);
    // }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const contextValue = useContext(AppContext);

  if (!contextValue) {
    throw Error("This hook must be used inside AppContextProvider!");
  }

  return contextValue
}
