<template>
    <div>
      <h2>Comparação de Jogadores</h2>
      <div>
      <h4>Selecione as métricas a serem exibidas:</h4>
      <div v-for="metric in metrics" :key="metric" class="form-check">
        <input 
          type="checkbox" 
          class="form-check-input" 
          :value="metric" 
          v-model="selectedMetrics" 
          id="metric-{{ metric }}"
        />
        <label class="form-check-label" :for="'metric-' + metric">{{ metric }}</label>
      </div>
    </div>
      <RadarChart :playerId1="playerId1" :playerId2="playerId2" :selectedMetrics="selectedMetrics" />
    </div>
  </template>
  
  <script>
  import RadarChart from '@/components/ChartTest';
  
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
        selectedMetrics: [],
      metrics: [
        'Goals', 
        'Assists', 
        'Acc_Passes_Percentage', 
        'Key_Passes-n', 
        'Tackles', 
        'Blocks', 
        'Interceptations', 
        'Duels_Won_Percentage', 
        'Shots', 
        'ShotsOnTarget_Percentage', 
        'Goals_Shot', 
        'Dribbles_Attempts_n', 
        'Dribbles_Success_Percentage', 
        'Fouls_Draw-n', 
        'Fouls_Committed-n', 
        'Save_Percentage', 
        'Goals_Conceded-n'
      ]
      };
    }
  };
  </script>
  