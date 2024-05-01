<template>
  <section id="chart">
    <div class="mb-4">
      <h2 class="text-capitalize mb-3 animate__animated animate__fadeInUp">
        santri report
      </h2>
      <div class="chart">
        <div class="box animate__animated animate__fadeInUp" v-for="(data, index) in santriData" :key="index">
          <!-- <div :id="'chart-' + index" ></div> -->
          <apexchart type="radialBar" height="140" :options="chartOptions[index]?.chartOptions"
            :series="chartOptions[index]?.series" :colors="chartOptions[index]?.colors" class="chart-container">
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
      santriData: [
      ],
      chartOptions: [],
      series: [0]
    }
  },
  computed: {
    ...mapState("home", ["dataChart"]),
  },
  watch: {
    dataChart: {
      handler(value) {
        const santriData = [
          { status: "Mahad", jumlah: value.hadir },
          { status: "Rumah", jumlah: value.pulang },
          { status: "Sakit", jumlah: value.sakit },
          { status: "Izin", jumlah: value.izin },
          { status: "Absen", jumlah: value.absen },
        ]
        this.santriData = santriData
        const sample = santriData.map((data, index) => {
          const percentage = (data.jumlah / value.total) * 100;
          return {
            series: [percentage.toFixed(0)],
            colors: [this.colors[index]],
            chartOptions: {
              chart: {
                height: 140,
                type: "radialBar",
              },
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
              labels: [data.status],
            },
          };
        });

        this.chartOptions = sample

        // Terapkan warna teks jumlah di luar chart
        this.santriData.forEach((data, index) => {
          const jumlahElement = document.getElementById("jumlah-" + index);
          if (jumlahElement) {
            jumlahElement.style.color = this.colors[index];
          }
        });
      }
    },
    immediate: true
  },
};
</script>

<!-- <script>
import ApexCharts from "apexcharts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      santriData: [
        { status: "Mahad", jumlah: 0 },
        { status: "Rumah", jumlah: 0 },
        { status: "Sakit", jumlah: 0 },
        { status: "Izin", jumlah: 0 },
        { status: "Absen", jumlah: 0 },
      ],
    };
  },
  computed: {
    ...mapState("home", ["chart", "dataChart"]),
  },

  mounted() {
    this.renderChart();
  },
  watch: {
    dataChart() {
      this.renderChart();
      this.santriData;
    },
  },
  methods: {
    renderChart() {
      const colors = ["#198754", "#6c757d", "#ffc107", "#0d6efd", "#dc3545"];
      const totalSantri = this.santriData.reduce(
        (total, data) => total + data.jumlah,
        0
      );

      this.santriData.map((data, index) => {
        const chartId = "chart-" + index;
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
      this.santriData.forEach((data, index) => {
        const jumlahElement = document.getElementById("jumlah-" + index);
        if (jumlahElement) {
          jumlahElement.style.color = colors[index];
        }
      });
    },
  },
};
</script> -->
<!-- <script>
import ApexCharts from "apexcharts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      santriData: [
        { status: "Mahad", jumlah: 0 },
        { status: "Rumah", jumlah: 0 },
        { status: "Sakit", jumlah: 0 },
        { status: "Izin", jumlah: 0 },
        { status: "Absen", jumlah: 0 },
      ],
    };
  },
  computed: {
    ...mapState("home", ["chart", "dataChart"]),
  },

  mounted() {
    this.renderChart();
  },
  watch: {
    dataChart() {
      this.renderChart();
      this.santriData;
    },
  },
  methods: {
    renderChart() {
      const colors = ["#198754", "#6c757d", "#ffc107", "#0d6efd", "#dc3545"];
      const totalSantri = this.santriData.reduce(
        (total, data) => total + data.jumlah,
        0
      );

      this.santriData.map((data, index) => {
        const chartId = "chart-" + index;
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
      this.santriData.forEach((data, index) => {
        const jumlahElement = document.getElementById("jumlah-" + index);
        if (jumlahElement) {
          jumlahElement.style.color = colors[index];
        }
      });
    },
  },
};
</script> -->
<!-- <script>
import ApexCharts from "apexcharts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      santriData: [
        { status: "Mahad", jumlah: 0 },
        { status: "Rumah", jumlah: 0 },
        { status: "Sakit", jumlah: 0 },
        { status: "Izin", jumlah: 0 },
        { status: "Absen", jumlah: 0 },
      ],
    };
  },
  computed: {
    ...mapState("home", ["chart", "dataChart"]),
  },

  mounted() {
    this.renderChart();
  },
  watch: {
    dataChart() {
      this.renderChart();
      this.santriData;
    },
  },
  methods: {
    renderChart() {
      const colors = ["#198754", "#6c757d", "#ffc107", "#0d6efd", "#dc3545"];
      const totalSantri = this.santriData.reduce(
        (total, data) => total + data.jumlah,
        0
      );

      this.santriData.map((data, index) => {
        const chartId = "chart-" + index;
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
      this.santriData.forEach((data, index) => {
        const jumlahElement = document.getElementById("jumlah-" + index);
        if (jumlahElement) {
          jumlahElement.style.color = colors[index];
        }
      });
    },
  },
};
</script> -->

<style scoped>
@import url(~/assets/css/dashboard/chart.css);
</style>
