<template>
  <section id="chart">
    <div class="mb-4">
      <h2 class="text-capitalize mb-3 animate__animated animate__fadeInUp">
        pegawai report
      </h2>
      <div class="chart">
        <div class="box animate__animated animate__fadeInUp" v-for="(data, index) in pegawaiData" :key="index">
          <!-- <div :id="'chart-' + index"></div> -->
          <apexchart type="radialBar" height="140" :options="chartOptions[index]?.chartOptions"
            :series="chartOptions[index]?.series" :colors="colors[index]" class="chart-container">
          </apexchart>
          <div class="desc-chart">
            <h1 class="text-secondary">{{ data.status }}</h1>
            <span :id="'jumlah-' + index">{{ data.jumlah }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapState } from "vuex";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    ...mapState("home", ["dataChart", 'colors', 'pegawaiData', 'chartOptions', 'series']),
  },
};
</script>

<style scoped>
@import url(~/assets/css/dashboard/chart-admin.css);
</style>
