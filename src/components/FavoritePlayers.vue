<template>
    <div class="card">
        <div class="card-header">
            <h2>Minha lista de jogadores</h2>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Equipe</th>
                            <th>Posição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody v-if="favoritePlayers && favoritePlayers.length > 0">
                        <tr v-for="player in favoritePlayers" :key="player.id">
                            <td>
                                <img :src="player.player_name.player_photo" alt="" class="rounded-circle" width="40"
                                    height="40">
                            </td>
                            <td>{{ player.player_name.Name }}</td>
                            <td>{{ player.player_name.Team }}</td>
                            <td>{{ player.player_name.Position }}</td>
                            <td>
                                <a :href="'/player/' + player.player_name.Id" class="btn btn-primary btn-sm" style="margin-right: 5px;">
                                    Detalhes
                                </a>
                                <button @click="removeFromFavorites(player.id)" class="btn btn-danger btn-sm">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4" class="text-center">Nenhum jogador na lista de favoritos.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
  