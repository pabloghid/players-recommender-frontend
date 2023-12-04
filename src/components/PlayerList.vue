<template>
  <div class="card">
    <div class="card-header">
      <h2>Lista de Jogadores</h2>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label for="searchTerm" style="display: block; text-align: left;" class="form-label">Buscar jogador:</label>
            <input v-model="searchTerm" id="searchTerm" class="form-control"
              placeholder="Comece a digitar para buscar jogadores">
          </div>
        </div>
      </div>

      <div v-if="showList" class="row">
        <div class="col-12">
          <div v-for="player in filtered_players" :key="player.Id" 
          class="comment mt-4 text-justify float-left">
            <a class="list-group-item" :href="'/player/' + player.Id">
              <img :src="player.player_photo" alt="" class="rounded-circle" width="40" height="40">
              <h5>{{ player.Name }}</h5>
              <span>Equipe: {{ player.Team }}</span>
            </a>
            <hr v-if="player">
          </div>
        </div>
      </div>
    </div>
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