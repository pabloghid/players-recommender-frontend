<template>
    <div>
      <h2>Jogadores Favoritos</h2>
      <ul>
      <a v-for="player in favoritePlayers" :href="'/player/' + player.player_name.Id" :key="player.id" class="list-group-item">
            {{ player.player_name.Name }} - {{ player.player_name.Position }}
      </a>
        <button @click="removeFromFavorites(player.id)">Excluir</button>
    </ul>
    </div>
  </template>
  
  <script>
  import { getAPI } from '../../api-axios.js';
  
  export default {
    data() {
      return {
        favoritePlayers: [],
      };
    },
    created() {
      this.fetchFavoritePlayers();
    },
    methods: {
      fetchFavoritePlayers() {
        getAPI
          .get('core/player-list/')
          .then(response => {
            this.favoritePlayers = response.data;
          })
          .catch(error => {
            console.error('Erro ao obter jogadores favoritos:', error);
          });
      },
      removeFromFavorites(playerId) {
        getAPI
            .delete(`core/player-list/${playerId}/`)
            .then(response => {
                this.fetchFavoritePlayers();
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        },
    },
  };
  </script>
  