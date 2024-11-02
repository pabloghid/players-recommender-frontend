<template>
  <button @click="fetchPlayerData">Carregar Dados do Jogador</button>
  <Radar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { getAPI } from '../../api-axios.js';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

export default {
  name: 'RadarChart',
  components: { Radar },
  props: {
    playerId1: {
      type: Number,
      required: true
    },
    playerId2: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: ['Speed', 'Strength', 'Agility', 'Endurance', 'Technique'],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    }
  },
  async created() {
    await this.fetchPlayerData()
  },
  methods: {
    async fetchPlayerData() {
      try {
        // Busca dados do primeiro jogador
        const response1 = await getAPI.get(`core/players/${this.playerId1}`);
        const playerData1 = response1.data;

        // Busca dados do segundo jogador
        const response2 = await getAPI.get(`core/players/${this.playerId2}`);
        const playerData2 = response2.data;

        // Converte os dados para números, se necessário
        const playerStats1 = [
          Number(playerData1.Goals_Assist),
          Number(playerData1.Accuracy_Passes),
          Number(playerData1.Key_Passes),
          Number(playerData1.Goals_Shot),
          Number(playerData1.Duels_Won)
        ];

        const playerStats2 = [
          Number(playerData2.Goals_Assist),
          Number(playerData2.Accuracy_Passes),
          Number(playerData2.Key_Passes),
          Number(playerData2.Goals_Shot),
          Number(playerData2.Duels_Won)
        ];

      this.chartData = {
        labels: ['Speed', 'Strength', 'Agility', 'Endurance', 'Technique'],
        datasets: [
            {
              label: playerData1.name,
              data: playerStats1,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: playerData2.name,
              data: playerStats2,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
        ]
      };
        console.log(this.chartData)
      } catch (error) {
        console.error('Erro: ', error);
      }
    },
  }
}

</script>
