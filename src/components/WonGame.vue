<script setup lang="ts">
import { inject } from 'vue';
import { AppContextValue, WonGame } from '../types';

const props = defineProps<WonGame>()
const { resetGame } = inject<AppContextValue>('AppContext')!
</script>

<template>
  <div className="won">
    <div>
      <h1>You Win!</h1>
      Final Score:
      <p className="score">{{props.score}}</p>
      <button @click="resetGame">Main Menu</button>
    </div>
  </div>
</template>
