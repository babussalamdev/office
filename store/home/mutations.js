export default {
  setChart(state, value) {
    const pegawaiData = [
      { status: "Total Pegawai", jumlah: value.total },
      { status: "Pegawai Aktif", jumlah: value.active },
      { status: "Pegawai Inaktif", jumlah: value.inactive },
    ];

    const sample = pegawaiData.map((item, index) => {
      const percentage = (item.jumlah / value.total) * 100;
      console.log(percentage)
      return {
        series: [percentage.toFixed(0)],
        chartOptions: {
          colors: [state.colors[index]],
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
              itemLabels: {
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
        labels: [item.status],
      };
    });
    state.pegawaiData = pegawaiData
    state.chartOptions = sample;
    state.pegawaiData.forEach((item, index) => {
      const jumlahElement = document.getElementById(
        `jumlah-${index}`
      );
      console.log(jumlahElement)
      if (jumlahElement) {
        jumlahElement.style.color = state.colors[index];
      }
    });
    console.log(state.chartOptions)
  }
}
