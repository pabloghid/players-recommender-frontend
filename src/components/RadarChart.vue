<template>
  <div class="container">
    <div class="row justify-content-center">
      <div style="width: 800px; height: 800px;"> 
        <Radar id="my-chart-id" :options="chartOptions" :data="chartData" />
      </div>
    </div>
  </div>
</template>


<script>
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { metricTranslations } from '@/utils/MetricTransaltions.js';
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
    },
    selectedMetrics: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
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
            beginAtZero: true,
            pointLabels: {
              font: {
                size: 14, 
                weight: 'bold' 
              },
              color: '#000'
            }
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
        const response1 = await getAPI.get(`core/players/${this.playerId1}`);
        const playerData1 = response1.data;

        const response2 = await getAPI.get(`core/players/${this.playerId2}`);
        const playerData2 = response2.data;

        const playerStats1 = this.selectedMetrics.map(metric => Number(playerData1[metric]));
        const playerStats2 = this.selectedMetrics.map(metric => Number(playerData2[metric]));

        const translatedLabels = this.selectedMetrics.map(metric => metricTranslations[metric] || metric);

      this.chartData = {
        labels: translatedLabels,
        datasets: [
            {
              label: playerData1.Name,
              data: playerStats1,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: playerData2.Name,
              data: playerStats2,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
        ]
      };
      } catch (error) {
        console.error('Erro: ', error);
      }
    }
  },
  watch: {
    selectedMetrics: 'fetchPlayerData'
  }
}

</script>
