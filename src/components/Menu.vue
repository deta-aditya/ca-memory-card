<script setup lang="ts">
import { inject } from 'vue';
import { AppContextValue } from '../types';

const { startGame } = inject<AppContextValue>('AppContext')!
</script>

<template>
  <div className="menu">
    <div>
      <h1>Memory Card</h1>
      <button @click="startGame">Start Game</button>
    </div>
  </div>
</template>