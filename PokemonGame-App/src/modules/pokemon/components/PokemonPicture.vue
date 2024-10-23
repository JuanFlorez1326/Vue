import { computed } from 'vue';
<template>
  <div>
    <img v-if="!showPokemon" :src="pokemonImg" class="brightness-0 h-[200px]" />
    <img v-else :src="pokemonImg" class="fade-in h-[200px]" alt="pokemon image" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});

const pokemonImg = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});
</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
