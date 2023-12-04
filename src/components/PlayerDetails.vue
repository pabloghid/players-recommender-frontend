<template>
    <div v-if="playerDetails" class="container mt-4">
        <div class="row">
            <div class="col-md-4">
                <div class="card mb-3">
                    <img :src="playerDetails.player_photo" class="card-img-top" alt="Foto do Jogador">
                    <div class="card-body">
                        <h5 class="card-title">{{ playerDetails.Name }}</h5>
                        <p class="card-text">{{ playerDetails.Position }}</p>
                        <p class="card-text">Idade: {{ playerDetails.Age }} anos</p>
                        <p class="card-text">País: {{ playerDetails.Nationality }}</p>
                        <p class="card-text">Peso: {{ playerDetails.Weight_kg }} kg</p>
                        <p class="card-text">Altura: {{ playerDetails.Height_cm }} m</p>
                        <p class="card-text"><small class="text-muted">Liga: {{ playerDetails.player_league_name }}</small>
                        </p>
                    </div>
                </div>
                <button class="btn btn-primary" v-if="!isPlayerInFavorites" @click="addToFavorites">
                    Adicionar a sua lista
                </button>
                <button class="btn btn-primary" v-if="isPlayerInFavorites" :disabled="isPlayerInFavorites">
                    Jogador na lista
                </button>
            </div>

            <div class="col-md-8">
                <div v-if="playerDetails" class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card-body">
                                <img :src="playerDetails.player_team_logo" class="img-fluid mx-auto" alt="Escudo do Time">
                                <p class="card-text mt-2 text-center">Equipe atual: {{ playerDetails.Team }}</p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="card border-0">
                                <div class="card-body">
                                    <h5 class="card-title">Estatísticas Gerais</h5>
                                    <p class="card-text">Jogos: {{ playerDetails.Games }}</p>
                                    <p class="card-text">Minutos jogados: {{ playerDetails.Minutes }}</p>
                                    <p class="card-text">Jogos com 90 minutos: {{ playerDetails.Ninety_S }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="playerDetails.Save_Percentage > 0" class="col-md-6">
                            <div class="card border-0">
                                <div class="card-body">
                                    <h5 class="card-title">Estatísticas de goleiro</h5>
                                    <p class="card-text">Gols concedidos: {{ playerDetails.Goals_Conceded }}</p>
                                    <p class="card-text">Gols concedidos/jogo: {{ playerDetails.Goals_Conceded_n }}</p>
                                    <p class="card-text">Defesas: {{ playerDetails.Goals_Saves }}</p>
                                    <p class="card-text">Porcentagem de defesas: {{ playerDetails.Save_Percentage
                                    }}%</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card border-0">
                                <div class="card-body">
                                    <h5 class="card-title">Estatísticas de ataque</h5>
                                    <p class="card-text">Gols na liga: {{ playerDetails.Goals_Total }}</p>
                                    <p class="card-text">Gols/jogo: {{ playerDetails.Goals }}</p>
                                    <p class="card-text">Chutes: {{ playerDetails.Shots_Total }}</p>
                                    <p class="card-text">Chutes ao gol: {{ playerDetails.Shots_On }}</p>
                                    <p class="card-text">Chutes/jogo: {{ playerDetails.Shots }}</p>
                                    <p class="card-text">Chutes ao gol/jogo: {{ playerDetails.ShotsOnTarget }}</p>
                                    <p class="card-text">Porcentagem de chutes ao gol: {{
                                        playerDetails.ShotsOnTarget_Percentage
                                    }}%</p>
                                    <p class="card-text">Gols/chute: {{ playerDetails.Goals_Shot }}</p>
                                    <p class="card-text">Gols/chutes ao gol: {{ playerDetails.Goals_ShotsOnTarget }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card border-0">
                                <div class="card-body">
                                    <h5 class="card-title">Estatisticas de Defesa</h5>
                                    <p class="card-text">Bloqueios: {{ playerDetails.Tackled_Block }}</p>
                                    <p class="card-text">Bloqueios/jogo: {{ playerDetails.Blocks }}</p>
                                    <p class="card-text">Interceptações: {{ playerDetails.Tackled_Intercept }}</p>
                                    <p class="card-text">Interceptações/jogo: {{ playerDetails.Interceptations }}</p>
                                    <p class="card-text">Desarmes: {{ playerDetails.Tackled_Total }}</p>
                                    <p class="card-text">Desarmes/jogo: {{ playerDetails.Tackles }}</p>
                                    <p class="card-text">Desarmes e interceptações/jogo: {{
                                        playerDetails.Tackles_Interceptations }}</p>
                                    <p class="card-text">Duelos ganhos: {{ playerDetails.Duels_Won }}</p>
                                    <p class="card-text">Total de duelos: {{ playerDetails.Duels_Total }}</p>
                                    <p class="card-text">Porcentagem de duelos ganhos: {{
                                        playerDetails.Duels_Won_Percentage
                                    }}%
                                    </p>
                                    <p class="card-text">Faltas cometidas: {{ playerDetails.Fouls_Committed }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card border-0">
                                <div class="card-body">
                                    <h5 class="card-title">Estatísticas de criação</h5>
                                    <p class="card-text">Assistências na liga: {{ playerDetails.Goals_Assist }}</p>
                                    <p class="card-text">Assistências/Jogo: {{ playerDetails.Assists }}</p>
                                    <p class="card-text">Precisão dos passes: {{ playerDetails.Accuracy_Passes }}%</p>
                                    <p class="card-text">Passes chave: {{ playerDetails.Key_Passes }}</p>
                                    <p class="card-text">Passes chave/jogo: {{ playerDetails.Key_Passes_n }}</p>
                                    <p class="card-text">Total de passes: {{ playerDetails.Total_Passes }}</p>
                                    <p class="card-text">Passes/jogo: {{ playerDetails.Passes_Total_n }}</p>
                                    <p class="card-text">Dribles tentados: {{ playerDetails.Dribbles_Attempts }}</p>
                                    <p class="card-text">Dribles completos: {{ playerDetails.Dribbles_Success }}</p>
                                    <p class="card-text">Porcentagem de dribles completos: {{
                                        playerDetails.Dribbles_Success_Percentage }}%</p>
                                    <p class="card-text">Faltas recebidas: {{ playerDetails.Fouls_Drawn }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card border-0">
                                <div class="card-body">
                                    <h5 class="card-title">Outras estatísticas</h5>
                                    <p class="card-text">Cartões amarelos: {{ playerDetails.Yellow_Cards }}</p>
                                    <p class="card-text">Cartões vermelhos: {{ playerDetails.Red_Cards }}</p>
                                    <p class="card-text">Dois amarelos: {{ playerDetails.Yellow_Red_Cards }}</p>
                                    <p class="card-text">Nota: {{ playerDetails.Rating }}</p>
                                </div>
                            </div>
                        </div>
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
            playerId: null,
            playerDetails: null,
            isPlayerInFavorites: false,
            isCheckingFavorites: false,
        };
    },
    mounted() {
        this.playerId = this.$route.params.id;
        this.fetchPlayerDetails();
    },
    methods: {
        async fetchPlayerDetails() {
            try {
                const response = await getAPI.get(`core/players/${this.playerId}`);
                this.playerDetails = response.data;

                this.checkIfPlayerInFavorites();
            } catch (error) {
                console.error('Erro: ', error);
            }
        },
        async addToFavorites() {
            try {
                await getAPI.post('core/player-list/', { player_id: this.playerId });

                this.isPlayerInFavorites = true;
            } catch (error) {
                console.error('Erro: ', error);
            }
        },
        async checkIfPlayerInFavorites() {
            try {
                this.isCheckingFavorites = true;
                const response = await getAPI.get(`core/is-player-in-favorites/${this.playerId}`);
                this.isPlayerInFavorites = response.data.is_in_favorites;
            } catch (error) {
                console.error('Erro: ', error);
            } finally {
                this.isCheckingFavorites = false;
            }
        },
    }
}
</script>