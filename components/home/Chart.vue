<template>
  <section id="chart">
    <div class="mb-4">
      <h2 class="text-capitalize mb-3 animate__animated animate__fadeInUp">
        absence report
      </h2>
      <div class="chart">
        <div
          class="box animate__animated animate__fadeInUp"
          v-for="(data, index) in santriData"
          :key="index"
        >
          <div class="">
            <div class="row">
              <div
                class="col-6 d-flex align-items-center justify-content-center"
              >
                <div :id="'chart-' + index" class="chart-container"></div>
              </div>
              <div class="col-6">
                <div class="desc-chart">
                  <h1 class="text-secondary">{{ data.status }}</h1>
                  <span :id="'jumlah-' + index">{{ data.jumlah }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  data() {
    return {
      santriData: [
        { status: "Mahad", jumlah: 102 },
        { status: "Rumah", jumlah: 62 },
        { status: "Sakit", jumlah: 42 },
        { status: "Izin", jumlah: 82 },
        { status: "Absen", jumlah: 32 },
      ],
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const colors = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6"];
      const totalSantri = this.santriData.reduce(
        (total, data) => total + data.jumlah,
        0
      );

      this.santriData.forEach((data, index) => {
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
</script>

<style>
@import url(~/assets/css/dashboard/chart.css);
</style>
