<template>
  <div
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Please wait</h1>
    <h3 class="animate-pulse">Loading Pokemons</h3>
  </div>

  <div v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1>Who is this Pokemon?</h1>

    <div class="h-20 mt-2">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(5)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Play again?
      </button>
    </div>

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <PokemonOptions
      :options="pokemonsOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </div>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { randomPokemon, isLoading, gameStatus, pokemonsOptions, checkAnswer, getNextRound } =
  usePokemonGame();
</script>
