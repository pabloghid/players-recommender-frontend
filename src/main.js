import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const routes = [
  { path: '/login', component: () => import('./components/Login.vue') },
  { path: '/register', component: () => import('./components/Register.vue') },
  { path: '/player-recommender', component: () => import('./components/PlayerRecommender.vue'), meta: { requiresAuth: true } },
  { path: '/players', component: () => import('./components/PlayerList.vue'), meta: { requiresAuth: true }},
  { 
    path: '/player/:id',
    name: 'PlayerDetails', 
    component: () => import('./components/PlayerDetails.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  { path: '/my-list', component: () => import('./components/FavoritePlayers.vue'), meta: { requiresAuth: true }},
  { path: '/graph', component: () => import('./components/RadarChart.vue'), meta: { requiresAuth: false }},
  { 
    path: '/comparison/:playerId1/:playerId2', 
    name: 'PlayerComparison',
    component: () => import('./components/PlayerComparision.vue'),
    props: true, 
    meta: { requiresAuth: false }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuth = localStorage.getItem('isAuth');
    if (!isAuth) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router); 
app.mount('#app');
