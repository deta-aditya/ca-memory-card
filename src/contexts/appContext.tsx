import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createApp } from "../core";
import { Game } from "../core/entities/game";
import { Card } from "../core/entities/card";

type AppContextValue = {
  state: Game;
  startGame: () => void;
  selectCard: (card: Card) => void;
  resetGame: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const app = createApp();

export function AppContextProvider(props: { children: ReactNode }) {
  const [state, setState] = useState<Game>({ kind: 'not-started' });

  const contextValue: AppContextValue = {
    state,
    startGame: () => app.startGame(null, setState),
    selectCard: card => app.selectCard({ card, game: state }, setState),
    resetGame: () => setState({ kind: 'not-started' }),
  }

  useEffect(() => {
    if (state.kind === 'matching') {
      const timeout = setTimeout(() => {
        app.matchCard(state, setState);
      }, 500)
      return () => clearTimeout(timeout);
    }
  }, [state])

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
