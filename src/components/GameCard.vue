<script setup lang="ts">
import { computed, inject } from 'vue';
import { GameCard } from '../core/entities/gameCard';
import { AppContextValue } from '../types';

const props = defineProps<GameCard>()
const { selectCard } = inject<AppContextValue>('AppContext')!

const cardClasses = computed(() => {
  return {
    matched: props.state === 'matched',
    colored: props.card.suit === 'diamond' || props.card.suit === 'heart',
    selected: props.state === 'selected',
    'matching-incorrectly': props.state === 'matching-incorrectly',
    'matching-correctly': props.state === 'matching-correctly',
  };
})
</script>

<template>
  <div
    class="game-card"
    :class="cardClasses"
    @click="selectCard(card)"
  >
    <template v-if="state !== 'mystery'">
      {{ card.rank }}
      <template v-if="card.suit === 'diamond'">&diams;</template>
      <template v-if="card.suit === 'club'">&clubs;</template>
      <template v-if="card.suit === 'heart'">&hearts;</template>
      <template v-if="card.suit === 'spade'">&spades;</template>
    </template>
  </div>
</template>
