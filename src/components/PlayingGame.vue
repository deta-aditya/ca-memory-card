<script setup lang="ts">
import { PlayingOrMatchingGame } from '../types';
import GameCard from './GameCard.vue';

const props = defineProps<PlayingOrMatchingGame>()
</script>

<template>
  <div className="playing-game">
    <div className="header">
      <div className="score">
        <span className="score-label">Score</span>
        <span className="score-value">{{ props.score }}</span>
      </div>
    </div>
    <div className="table">
      <GameCard 
        v-for="gameCard in props.cards"
        :key="`${gameCard.card.rank}-${gameCard.card.suit}`" 
        :state="gameCard.state"
        :card="gameCard.card"
      />
    </div>
  </div>
</template>