<template>
      <h1>Recomendador de Jogadores</h1>
      <div class="mb-3">
        <div class="row">
          <div class="col-md-6">
            <label for="teamFilter" class="form-label">Filtrar por time:</label>
            <input
              type="text"
              class="form-control"
              id="teamFilter"
              v-model="filterTeam"
              @input="filterPlayers"
              placeholder="Insira o nome do time"
            />
          </div>
          <div class="col-md-6">
            <label for="selectPlayer" class="form-label">Selecione um jogador:</label>
            <select v-model="selectedPlayer" @change="playerSelected" class="form-select" id="selectPlayer">
              <option v-for="player in filteredPlayers" :key="player.Id" :value="player">
                {{ player.Name }} - {{ player.Team }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="similarPlayers.length > 0">
        <h2>Jogadores similares</h2>
        <ul class="list-group">
          <a v-for="similar_player in similarPlayers" :key="similar_player.id"
           class="list-group-item" :href="'/player/' + similar_player.id">
            {{ similar_player.name }} - {{ similar_player.team }}
          </a>
        </ul>
      </div>
  </template>
  
  <script>
  import { getAPI } from '../../api-axios.js';
  
  export default {
    name: "PlayerList",
    data() {
      return {
        players: [],
        filterName: "",
        filterTeam: "",
        selectedPlayer: null,
        similarPlayers: [],
      };
    },
    computed: {
      filteredPlayers() {
        const filterNameText = this.filterName.toLowerCase();
        const filterTeamText = this.filterTeam.toLowerCase();
  
        return this.players.filter(
          (player) =>
            player.Name.toLowerCase().includes(filterNameText) &&
            player.Team.toLowerCase().includes(filterTeamText)
        );
      },
    },
    mounted() {
      this.fetchPlayers();
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
      async fetchSimilarPlayers(playerId) {
        try {
          const response = await getAPI.get(`core/players/similar/${playerId}/`);
          this.similarPlayers = response.data.neighbors;
        } catch (error) {
          console.error('Error fetching similar players:', error);
        }
      },
      async playerSelected() {
        if (this.selectedPlayer) {
          await this.fetchSimilarPlayers(this.selectedPlayer.Id);
        } else {
          this.similarPlayers = [];
        }
      },
    },
  };
  </script>
  