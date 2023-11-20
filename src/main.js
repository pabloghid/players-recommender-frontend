import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./components/PlayerList.vue') },
    { 
      path: '/player/:id',
      name: 'PlayerDetails', 
      component: () => import('./components/PlayerDetails.vue'),
      props: true 
    },
  ],
});

const app = createApp(App);
app.use(router); 
app.mount('#app');
