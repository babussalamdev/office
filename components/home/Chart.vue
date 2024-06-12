<template>
  <section id="chart">
    <div class="mb-4">
      <h2 class="text-capitalize mb-3 animate__animated animate__fadeInUp">
        santri report
      </h2>
      <div class="chart">
        <div class="box animate__animated animate__fadeInUp" v-for="(data, index) in santriData" :key="index">
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
  data() {
    return {
      colors: ["#198754", "#6c757d", "#ffc107", "#0d6efd", "#dc3545"],
      santriData: [],
      chartOptions: [],
      series: [0],
    };
  },
  computed: {
    ...mapState("home", ["dataChart"]),
  },
  watch: {
    dataChart: {
      handler(value) {
        try {
          const santriData = [
            { status: "Mahad", jumlah: value.hadir },
            { status: "Rumah", jumlah: value.pulang },
            { status: "Sakit", jumlah: value.sakit },
            { status: "Izin", jumlah: value.izin },
            { status: "Absen", jumlah: value.absen },
          ];
          this.santriData = santriData;
          const sample = santriData.map((data, index) => {
            const percentage = (data.jumlah / value.total) * 100;
            return {
              series: [percentage.toFixed(0)],
              chartOptions: {
                colors: [this.colors[index]],
                chart: {
                  height: 140,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      margin: 2,
                      size: "40%",
                    },
                    dataLabels: {
                      style: {
                        colors: ["#F44336", "#E91E63", "#9C27B0"],
                      },
                      showOn: "always",
                      name: {
                        offsetY: -20,
                        show: false,
                        color: "#000",
                        fontSize: "13px",
                      },
                      value: {
                        offsetY: 4,
                        color: "#000",
                        fontSize: "14px",
                        show: true,
                      },
                    },
                  },
                },
              },
              labels: [data.status],
            };
          });

          this.chartOptions = sample;
          this.santriData.forEach((data, index) => {
            const jumlahElement = document.getElementById(
              `jumlah-${index}-chart`
            );
            if (jumlahElement) {
              jumlahElement.style.color = colors[index];
            }
          });
        } catch (error) {
          console.error("Terjadi kesalahan:", error);
        }
      },
    },
    immediate: true,
  },

  methods: {
    setChartColors() {
      this.santriData.forEach((data, index) => {
        const jumlahElement = document.getElementById(`jumlah-${index}-chart`);
        if (jumlahElement) {
          jumlahElement.style.color = this.colors[index];
        }
      });
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/dashboard/chart.css);
</style>
