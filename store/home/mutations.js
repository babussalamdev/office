export default {
  setChartAdmin(state, value) {
    const pegawaiData = [
      { status: "Total Pegawai", jumlah: value.total },
      { status: "Pegawai Aktif", jumlah: value.active },
      { status: "Pegawai Inaktif", jumlah: value.inactive },
    ];
    let sample;
    sample = pegawaiData.map((item, index) => {
      const percentage = value.total === 0 ? 0 : (item.jumlah / value.total) * 100;
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
                margin: 0,
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
          labels: [""],
        },
      };
    });
    state.pegawaiData = pegawaiData;
    state.chartOptions = sample;
    state.pegawaiData.forEach((item, index) => {
      const jumlahElement = document.getElementById(`jumlah-${index}`);
      if (jumlahElement) {
        jumlahElement.style.color = state.colors[index];
      }
    });
  },
  setChartSarpras(state, value) {
    state.sarprasData = value;
  },
  setChart(state, value) {
    // chart class
    const izinData = [];
    const sakitData = [];
    const absenData = [];
    const pulangData = [];

    Object.keys(value.kelasCounts).forEach((kelas) => {
      izinData.push(value.kelasCounts[kelas].asrama_izin);
      sakitData.push(value.kelasCounts[kelas].asrama_sakit);
      absenData.push(value.kelasCounts[kelas].asrama_absen);
      pulangData.push(value.kelasCounts[kelas].asrama_rumah);
    });

    // Menyusun series sesuai format chart
    state.series = [
      { name: "Izin", data: izinData },
      { name: "Sakit", data: sakitData },
      { name: "Absen", data: absenData },
      { name: "Pulang", data: pulangData },
    ];

    const kelasNames = Object.keys(value.kelasCounts).map((kelas) => kelas.toUpperCase());
    state.cate = kelasNames;

    // ✅ FIXED: Parsing dan formatting waktu santri
    const sortedSantriData = value.SantriData.map((santri) => {
      const timeStr = santri.Logs?.asrama?.time;

      if (timeStr) {
        try {
          // Ubah jadi ISO-compliant agar bisa di-parse
          const isoString = timeStr.replace(" ", "T");
          const dateObj = new Date(isoString);

          if (!isNaN(dateObj)) {
            // Simpan objek Date untuk sorting
            santri.Logs.asrama.timeObj = dateObj;

            // Format untuk ditampilkan
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            const hours = String(dateObj.getHours()).padStart(2, "0");
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");
            const seconds = String(dateObj.getSeconds()).padStart(2, "0");

            santri.Logs.asrama.time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          } else {
            santri.Logs.asrama.time = "Invalid Date";
            santri.Logs.asrama.timeObj = null;
          }
        } catch (e) {
          santri.Logs.asrama.time = "Invalid Date";
          santri.Logs.asrama.timeObj = null;
        }
      } else {
        santri.Logs.asrama.time = "Invalid Date";
        santri.Logs.asrama.timeObj = null;
      }

      return santri;
    });

    // ✅ Now sort using the Date object
    sortedSantriData.sort((a, b) => {
      const dateA = a.Logs.asrama.timeObj ? a.Logs.asrama.timeObj.getTime() : 0;
      const dateB = b.Logs.asrama.timeObj ? b.Logs.asrama.timeObj.getTime() : 0;
      return dateB - dateA; // newest first
    });

    state.highlight = sortedSantriData;
    state.kelasCounts = value.kelasCounts;

    // Data pegawai (ringkasan status)
    const pegawaiData = [
      { status: "Mahad", jumlah: value.asrama_sekolah },
      { status: "Pulang", jumlah: value.asrama_rumah },
      { status: "Sakit", jumlah: value.asrama_sakit },
      { status: "Izin", jumlah: value.asrama_izin },
      { status: "Absen", jumlah: value.asrama_absen },
    ];

    // Chart radial bar
    const sample = pegawaiData.map((item, index) => {
      const percentage = value.total_santri === 0 ? 0 : (item.jumlah / value.total_santri) * 100;
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
                margin: 0,
                size: "40%",
              },
              dataLabels: {
                style: {
                  colors: ["#000"],
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
          labels: [""],
        },
      };
    });

    state.santriData = pegawaiData;
    state.chartOptions = sample;

    // Ganti warna teks sesuai chart
    state.santriData.forEach((item, index) => {
      const jumlahElement = document.getElementById(`jumlah-${index}`);
      if (jumlahElement) {
        jumlahElement.style.color = state.colors[index];
      }
    });
  },
};
