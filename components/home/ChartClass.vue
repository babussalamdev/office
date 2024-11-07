<template>
  <div>
    <h2 class="mb-3 text-capitalize animate__animated animate__fadeInUp">
      violation report
    </h2>
    <div class="chart-class animate__animated animate__fadeInUp">
      <div id="chart">
        <apexchart type="bar" height="350" :options="renderChart" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    ...mapState('home', ['series', 'cate']),
    renderChart() {
      const chartOptions = {
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
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: 'end', // 'around', 'end'
            borderRadiusWhenStacked: 'last', // 'all', 'last'
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          type: 'category',
          categories: this.cate,
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        },
        colors: ['#3FA2F6', '#FFB200', '#E4003A', '#6c757d']
      }
      return chartOptions
    }
  },
}
</script>

<style scoped>
@import url(~/assets/css/dashboard/class.css);

h2 {
  font-size: 14px;
}
</style>

<!-- <template>
  <div>
    <StackedColumnChart :chart-data="chartData" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { x: 'Category A', y: [44, 55, 41, 67, 22, 43] },
        { x: 'Category B', y: 18 },
        { x: 'Category C', y: 13 }
      ]
    };
  }
};
</script> -->
