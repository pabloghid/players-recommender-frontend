<template>
    <div>
      <RadarChart :playerId1="selectedPlayerId" :playerId2="selectedPlayerId2" />
    </div>
  </template>
  
  <script>
  import RadarChart from '@/components/ChartTest' // Ajuste o caminho conforme a estrutura do seu projeto
  
  export default {
    name: 'PlayerStats',
    components: { RadarChart },
    data() {
      return {
        selectedPlayerId: 1100,
        selectedPlayerId2: 10321
      }
    }
  }
  </script>
  