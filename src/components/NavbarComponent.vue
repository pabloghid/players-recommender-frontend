<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/player-recommender" class="navbar-brand">Recomendador de Jogadores Similares</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/players" class="nav-link">Jogadores</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/my-list" class="nav-link">Minha Lista</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link @click="logout" to="/login" class="nav-link">Logout</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/register" class="nav-link">Registrar</router-link>
        </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAPI } from '../../api-axios.js';

export default {
  data() {
    return {
      isAuthenticated: localStorage.getItem('isAuth') === 'true',
    };
  },
  methods: {
    logout() {
      getAPI.post('core/user/')
        .then(response => {
          localStorage.removeItem('token');
          localStorage.removeItem('isAuth');
          this.isAuthenticated = false;
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Erro ao fazer logout:', error);
        });
    }
  },
};
</script>