import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemonStore', {
  state: () => ({
    pokemons: [],
    pokemonDetail: null,
    isLoading: false,
    pagination: {
      limit: 20,
      offset: 0,
    },
  }),
  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_POKEAPI_URL}?limit=${this.pagination.limit}&offset=${this.pagination.offset}`
        );
        this.pokemons = data.results;
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPokemonDetail(name) {
      this.isLoading = true;
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_POKEAPI_URL}/${name}`);
        this.pokemonDetail = data;
      } catch (error) {
        console.error('Error fetching Pokemon detail:', error);
      } finally {
        this.isLoading = false;
      }
    },
    setPageOffset(offset) {
      this.pagination.offset = offset;
      this.fetchPokemons();
    },
    nextPage() {
      this.setPageOffset(this.pagination.offset + this.pagination.limit);
    },
    prevPage() {
      if (this.pagination.offset >= this.pagination.limit) {
        this.setPageOffset(this.pagination.offset - this.pagination.limit);
      }
    },
  },
});
