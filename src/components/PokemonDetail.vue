<template>
  <div class="pokemon-detail">
    <Loader v-if="isLoading" />

    <template v-else>
      <div v-if="pokemon">
        <h1>{{ pokemon.name }}</h1>
        <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
        
        <!-- Abilities -->
        <div v-if="pokemon.abilities.length">
          <h3>Abilities:</h3>
          <ul>
            <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
              {{ ability.ability.name }}
            </li>
          </ul>
        </div>

        <!-- Base Experience -->
        <p>Base Experience: {{ pokemon.base_experience }}</p>

        <!-- Forms -->
        <div v-if="pokemon.forms.length">
          <h3>Forms:</h3>
          <ul>
            <li v-for="form in pokemon.forms" :key="form.name">
              {{ form.name }}
            </li>
          </ul>
        </div>

        <!-- Height -->
        <p>Height: {{ pokemon.height }}</p>

        <!-- Held Items -->
        <div v-if="pokemon.held_items.length">
          <h3>Held Items:</h3>
          <ul>
            <li v-for="item in pokemon.held_items" :key="item.item.name">
              {{ item.item.name }}
            </li>
          </ul>
        </div>

        <!-- ID -->
        <p>ID: {{ pokemon.id }}</p>

        <!-- Is Default -->
        <p>Is Default: {{ pokemon.is_default }}</p>

        <!-- Location Area Encounters -->
        <p>Location Area Encounters: {{ pokemon.location_area_encounters }}</p>

        <!-- Order -->
        <p>Order: {{ pokemon.order }}</p>

        <!-- Species -->
        <p>Species: {{ pokemon.species.name }}</p>

        <!-- Types -->
        <div v-if="pokemon.types.length">
          <h3>Types:</h3>
          <ul>
            <li v-for="type in pokemon.types" :key="type.slot">
              {{ type.type.name }}
            </li>
          </ul>
        </div>

        <!-- Stats -->
        <div v-if="pokemon.stats.length">
          <h3>Stats:</h3>
          <ul>
            <li v-for="stat in pokemon.stats" :key="stat.stat.name">
              {{ stat.stat.name }}: {{ stat.base_stat }}
            </li>
          </ul>
        </div>

        <!-- Weight -->
        <p>Weight: {{ pokemon.weight }}</p>
      </div>
      <div v-else>
        <p>Pokemon not found</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemonStore';
import Loader from './LoaderApp.vue';

const pokemonStore = usePokemonStore();
const route = useRoute();

const pokemon = computed(() => {
  console.log(pokemonStore.pokemonDetail);
  return pokemonStore.pokemonDetail
})

onMounted(() => {
  pokemonStore.fetchPokemonDetail(route.params.name);
});

</script>

<style scoped>
.pokemon-detail {
  padding: 20px;
}
img {
  width: 150px;
  height: 150px;
}
</style>
