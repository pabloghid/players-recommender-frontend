<template>
  <div class="container">
    <h2 class="text-center my-4">Comparação de Jogadores</h2>
    
    <div class="row justify-content-center align-items-center mb-4">
      <div class="col text-center">
        <img :src="player1.photo" alt="Foto do Jogador 1" class="rounded-circle img-thumbnail" style="width: 80px; height: 80px;">
        <h4 class="mt-2">{{ player1.name }}</h4>
      </div>
      
      <div class="col-auto">
        <span class="display-4">vs</span>
      </div>
      
      <div class="col text-center">
        <img :src="player2.photo" alt="Foto do Jogador 2" class="rounded-circle img-thumbnail" style="width: 80px; height: 80px;">
        <h4 class="mt-2">{{ player2.name }}</h4>
      </div>
    </div>
    
    <div>
      <h5>Selecione as métricas a serem exibidas:</h5>
      <div class="row">
        <div v-for="metric in translatedMetrics" :key="metric.value" class="col-6 col-md-4 col-lg-3 mb-2">
          <div class="form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            :value="metric.value" 
            v-model="selectedMetrics" 
            :id="'metric-' + metric.value"
          />
          <label class="form-check-label" :for="'metric-' + metric.value">{{ metric.label }}</label>
        </div>
      </div>
    </div>
    </div>


    
    <div class="my-4">
      <RadarChart 
        :playerId1="playerId1" 
        :playerId2="playerId2" 
        :selectedMetrics="selectedMetrics" 
      />
    </div>
  </div>
</template>
  
  <script>
  import RadarChart from '@/components/RadarChart';
  import { metricTranslations } from '@/utils/MetricTransaltions.js';
  import { getAPI } from '../../api-axios.js';
  
  export default {
    name: 'PlayerComparison',
    components: { RadarChart },
    props: {
      playerId1: {
        type: Number,
        required: true
      },
      playerId2: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        player1: { name: '', photo: '' },
        player2: { name: '', photo: '' },
        selectedMetrics: [],
        metrics: Object.keys(metricTranslations)
      };
    },
    computed: {
      translatedMetrics() {
        return this.metrics.map(metric => ({
          value: metric,
          label: metricTranslations[metric] || metric
        }));
      }
    },
    async created() {
      await this.fetchPlayerDetails();
    },
    methods: {
      async fetchPlayerDetails() {
        try {
          const response1 = await getAPI.get(`core/players/${this.playerId1}`);
          const response2 = await getAPI.get(`core/players/${this.playerId2}`);
          
          this.player1 = {
            name: response1.data.Name,
            photo: response1.data.player_photo 
          };
          
          this.player2 = {
            name: response2.data.Name,
            photo: response2.data.player_photo
          };
        } catch (error) {
          console.error('Erro ao buscar dados dos jogadores:', error);
        }
      }
    }
  };
  </script>
  