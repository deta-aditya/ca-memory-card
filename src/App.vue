<script setup lang="ts">
import { provide, ref, watch } from 'vue';

import Root from './components/Root.vue';

import { createApp } from './core'
import { Game } from './core/entities/game';
import { Card } from './core/entities/card';
import { AppContextValue } from './types';

const app = createApp();
const state = ref<{ game: Game }>({ 
  game: { kind: 'not-started' }
});

function setState(newState: Game) {
  state.value.game = newState;
}

watch(state, (newState) => {
  if (newState.game.kind === 'matching') {
    setTimeout(() => {
      app.matchCard(newState.game, setState);
    }, 500)
  }
}, { deep: true })

const contextValue: AppContextValue = {
  state,
  startGame: () => app.startGame(null, setState),
  selectCard: (card: Card) => app.selectCard({ game: state.value.game, card }, setState),
  resetGame: () => setState({ kind: 'not-started' }),
}

provide<AppContextValue>('AppContext', contextValue);
</script>

<template>
  <div class="app">
    <Root />
  </div>
</template>
