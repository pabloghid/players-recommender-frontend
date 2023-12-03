<template>
  <div>
    <h1>Lista de Jogadores</h1>
    <input v-model="searchTerm" class="form-control" placeholder="Comece a digitar para buscar jogadores">
    <ul v-if="showList" class="list-group">
      <a v-for="player in filtered_players" :key="player.Id" :href="'/player/' + player.Id" class="list-group-item">
        {{ player.Name }} - {{ player.Team }}
      </a>
    </ul>
  </div>
</template>

<script>
import { getAPI } from '../../api-axios.js';

export default {
  data() {
    return {
      players: [],
      searchTerm: '',
      showList: false,
    };
  },
  mounted() {
    this.fetchPlayers();
  },
  watch: {
    searchTerm() {
      this.filterPlayers();
    },
  },
  methods: {
    async fetchPlayers() {
      try {
        const response = await getAPI.get('core/players/');
        this.players = response.data;
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    },
    filterPlayers() {
      if (this.searchTerm.length >= 3) {
        const filterText = this.searchTerm.toLowerCase();
        this.filtered_players = this.players.filter(
          (player) =>
            player.Name.toLowerCase().includes(filterText) ||
            player.Team.toLowerCase().includes(filterText)
        );
        this.showList = true
      } else {
        this.showList = false
      }
    },
  },
}
</script>