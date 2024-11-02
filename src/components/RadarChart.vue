<template>
<div>
    <div v-for="metric in availableMetrics" :key="metric">
      <label>
        <input
          type="checkbox"
          :value="metric"
          v-model="selectedMetrics"
        />
        {{ metric }}
      </label>
    </div>
    
    <RadarChart :playerId1="selectedPlayerId" :playerId2="selectedPlayerId2" :selectedMetrics="selectedMetrics" />
    </div>
  </template>
  
  <script>
  import RadarChart from '@/components/ChartTest'
  
  export default {
    name: 'PlayerStats',
    components: { RadarChart },
    data() {
      return {
        selectedPlayerId: 1100,
        selectedPlayerId2: 10321,
        selectedMetrics: [],
      availableMetrics: [
        'Goals', 'Assists', 'Acc_Passes_Percentage', 'Key_Passes-n', 'Tackles', 'Blocks', 
        'Interceptations', 'Duels_Won_Percentage', 'Shots', 'ShotsOnTarget_Percentage', 
        'Goals_Shot', 'Dribbles_Attempts_n', 'Dribbles_Success_Percentage', 
        'Fouls_Draw-n', 'Fouls_Committed-n', 'Save_Percentage', 'Goals_Conceded-n'
      ]
      }
    },
    
  }
  </script>
  