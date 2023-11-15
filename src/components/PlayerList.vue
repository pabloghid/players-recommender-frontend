<template>
    <div class="players_container">
      <div class="players_content">
        <h1>Players</h1>
        <div class="filter-container">
          <label for="teamFilter">Filter by Team:</label>
          <input
            type="text"
            id="teamFilter"
            v-model="filterTeam"
            @input="filterPlayers"
          />
        </div>
        <select v-model="selectedPlayer" @change="fetchSimilarPlayers">
          <option v-for="player in filteredPlayers" :key="player.Id" :value="player">
            {{ player.Name }} - {{ player.Team }}
          </option>
        </select>
        <div>
          <h2>Similar Players</h2>
          <ul>
            <li v-for="player in similarPlayers.neighbors" :key="player.Id">
              {{ player.name }} - {{ player.team }}
            </li>
          </ul>
        </div>
      </div>
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
        filterTeam: "", // Adicionado campo para filtrar por time
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
          const response = await getAPI.get('core/api/players/');
          this.players = response.data;
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      },
      async fetchSimilarPlayers() {
        if (this.selectedPlayer) {
          try {
            const playerId = this.selectedPlayer.Id;
            const response = await getAPI.get(`core/api/players/similar/${playerId}/`);
            this.similarPlayers = response.data;
          } catch (error) {
            console.error('Error fetching similar players:', error);
          }
        }
      },
      filterPlayers() {
        // Executar alguma ação ao filtrar os jogadores, se necessário
      },
    },
  };
  </script>
  
  <style scoped>
  /* Adicione estilos conforme necessário */
  .filter-container {
    margin-bottom: 10px;
  }
  </style>
  