<template>
  <div>
    <apexchart width="100%" type="bar" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        xaxis: {
          categories: this.chartData.map(item => item.x)
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'top'
        }
      },
      chartSeries: [{
        data: this.chartData.map(item => item.y)
      }]
    };
  }
};
</script>

<style scoped>
/* Tambahkan gaya kustom di sini jika diperlukan */
</style>
