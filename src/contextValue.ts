import { Card } from './core/entities/card';
import { AppContextValue } from './types';
import { state, app, setState } from './App.vue';

export const contextValue: AppContextValue = {
state: state.value.game,
startGame: () => {
app.startGame(null, setState);
},
selectCard: (card: Card) => app.selectCard({ game: state.value.game, card }, setState),
resetGame: () => setState({ kind: 'not-started' }),
};
