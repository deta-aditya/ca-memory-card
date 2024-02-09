import Menu from './components/Menu';
import PlayingGame from './components/PlayingGame';
import WonGame from './components/WonGame';
import { AppContextProvider, useAppContext } from './contexts/appContext';

function App() {
  const { state } = useAppContext()

  return (
    <div className="app">
      {state.kind === 'not-started' && (
        <Menu />
      )}
      {(state.kind === 'playing' || state.kind === 'matching') && (
        <PlayingGame kind={state.kind} actions={state.actions} cards={state.cards} score={state.score} />
      )}
      {state.kind === 'won' && (
        <WonGame kind={state.kind} score={state.score} />
      )}
    </div>
  )
}

function AppWithProvider() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

export default AppWithProvider
