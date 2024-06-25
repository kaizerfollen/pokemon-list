import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PokemonPage from '../views/PokemonPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/pokemon/:name',
    name: 'PokemonPage',
    component: PokemonPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
