<template>
  <section id="chart">
    <div class="mb-4">
      <h2 class="text-capitalize mb-3 animate__animated animate__fadeInUp">
        pegawai report
      </h2>
      {{ pegawaiData }}<br /><br />
      {{ chartOptions }}
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
<!-- 
<script>
import ApexCharts from "apexcharts";
import { mapState } from 'vuex'
export default {
  data() {
    return {
      santriDataAdmin: [
        { status: "Total Pegawai", jumlah: 102 },
        { status: "Pegawai Aktif", jumlah: 62 },
        { status: "Pegawai InAktif", jumlah: 42 },
        // { status: "Izin", jumlah: 82 },
        // { status: "Absen", jumlah: 32 },
      ],
    };
  },
  mounted() {
    this.renderChartAdmin();
  },
  computed: {
    ...mapState('home', ['dataChart'])
  },
  watch: {
    dataChart() {

    }
  },
  methods: {
    renderChartAdmin() {
      const colors = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6"];
      const totalSantri = this.santriDataAdmin.reduce(
        (total, data) => total + data.jumlah,
        0
      );

      this.santriDataAdmin.forEach((data, index) => {
        const chartId = "chartAdmin-" + index;
        const percentage = (data.jumlah / totalSantri) * 100;
        const options = {
          chart: {
            height: 140,
            type: "radialBar",
          },
          series: [percentage.toFixed(0)],
          colors: [colors[index]],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 1,
                size: "40%",
              },
              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -20,
                  show: false,
                  color: "#888",
                  fontSize: "13px",
                },
                value: {
                  offsetY: 4,
                  color: "#111",
                  fontSize: "14px",
                  show: true,
                },
              },
            },
          },
          //   stroke: {
          //     lineCap: "round",
          //   },
          labels: [data.status],
        };

        const chart = new ApexCharts(document.getElementById(chartId), options);
        chart.render();
      });
      // Terapkan warna teks jumlah di luar chart
      this.santriDataAdmin.forEach((data, index) => {
        const jumlahElement = document.getElementById("jumlahAdmin-" + index);
        if (jumlahElement) {
          jumlahElement.style.color = colors[index];
        }
      });
    },
  },
};
</script> -->

<style scoped>
@import url(~/assets/css/dashboard/chart-admin.css);
</style>
