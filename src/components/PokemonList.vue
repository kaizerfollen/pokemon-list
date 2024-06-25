<template>
  <div class="pokemon-list">
    <h1>Pokemon List</h1>
    <Loader v-if="isLoading" />
    <div v-else class="cards">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="card">
        <h2 @click="viewPokemon(pokemon.name)">{{ pokemon.name }}</h2>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="pagination?.offset === 0">Назад</button>
      <button @click="nextPage">Вперед</button>
    </div>
  </div>
</template>

<script setup>

import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '../stores/pokemonStore';
import Loader from './LoaderApp.vue';

const pokemonStore = usePokemonStore();
const { pagination, nextPage, prevPage } = pokemonStore;

const router = useRouter();

const pokemons = computed(() => {
  return pokemonStore.pokemons
})

onMounted(() => {
  pokemonStore.fetchPokemons();
});

const viewPokemon = (name) => {
  router.push(`/pokemon/${name}`);
};

</script>

<style lang="scss" scoped>
.pokemon-list {
  padding: 20px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
