<template>
  <div v-if="loginSuccess" class="alert alert-success mb-1">
    Bem vindo, {{ username }}!
  </div>
  <div class="card">
    <div class="card-header">
      <h2>Recomendador de Jogadores</h2>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <div class="row">
          <div class="col-md-6">
            <label for="teamFilter" class="form-label">Filtrar por time:</label>
            <input type="text" class="form-control" id="teamFilter" v-model="filterTeam" @input="filterPlayers"
              placeholder="Insira o nome do time" />
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

      <div v-if="similarPlayers.length > 0" class="row">
        <div class="col-12 pb-4">
          <h2>Jogadores similares</h2>
          <hr>
          <div v-for="similar_player in similarPlayers" :key="similar_player.id"
            class="comment mt-4 text-justify float-left">
            <a class="list-group-item" :href="'/player/' + similar_player.id">
              <h5>{{ similar_player.name }}</h5>
              <span>Equipe: {{ similar_player.team }}</span>
            </a>
            <hr v-if="similarPlayers.length - 1 > 0">
          </div>
        </div>
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
      filterTeam: "",
      selectedPlayer: null,
      similarPlayers: [],
      username: "",
      loginSuccess: false
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
    this.loadUserData();
  },
  methods: {
    async fetchPlayers() {
      try {
        const response = await getAPI.get('core/players/');
        this.players = response.data;
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async fetchSimilarPlayers(playerId) {
      try {
        const response = await getAPI.get(`core/players/similar/${playerId}/`);
        this.similarPlayers = response.data.neighbors;
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async playerSelected() {
      if (this.selectedPlayer) {
        await this.fetchSimilarPlayers(this.selectedPlayer.Id);
      } else {
        this.similarPlayers = [];
      }
    },

    loadUserData() {
      getAPI.get('core/user/')
        .then(response => {
          this.username = response.data.username;
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }

  },
  created() {
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      this.loginSuccess = true;
      localStorage.removeItem('loginSuccess');
    }
  },
};
</script>
  