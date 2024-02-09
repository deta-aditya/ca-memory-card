<script setup lang="ts">
import { computed, inject } from 'vue';
import Menu from './Menu.vue';
import PlayingGame from './PlayingGame.vue';
import { AppContextValue } from '../types';
import WonGame from './WonGame.vue';

const { state } = inject<AppContextValue>('AppContext')!
const game = computed(() => state.value.game);

</script>

<template>
  <Menu v-if="game.kind === 'not-started'" />
  <PlayingGame 
    v-if="game.kind === 'playing' || game.kind === 'matching'" 
    :actions="game.actions"
    :cards="game.cards"
    :kind="game.kind"
    :score="game.score"
  />
  <WonGame 
    v-if="game.kind === 'won'"
    :kind="game.kind"
    :score="game.score"
  />
</template>