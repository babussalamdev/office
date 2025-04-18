export default {
  setChartAdmin(state, value) {
    const pegawaiData = [
      { status: "Total Pegawai", jumlah: value.total },
      { status: "Pegawai Aktif", jumlah: value.active },
      { status: "Pegawai Inaktif", jumlah: value.inactive },
    ];
    let sample
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
          labels: [''],
        },
      };
    });
    state.pegawaiData = pegawaiData
    state.chartOptions = sample;
    state.pegawaiData.forEach((item, index) => {
      const jumlahElement = document.getElementById(
        `jumlah-${index}`
      );
      if (jumlahElement) {
        jumlahElement.style.color = state.colors[index];
      }
    });
  },
  setChart(state, value) {
    // chart class
    const izinData = [];
    const sakitData = [];
    const absenData = [];
    const pulangData = [];

    Object.keys(value.kelasCounts).forEach(kelas => {
      izinData.push(value.kelasCounts[kelas].asrama_izin);
      sakitData.push(value.kelasCounts[kelas].asrama_sakit);
      absenData.push(value.kelasCounts[kelas].asrama_absen);
      pulangData.push(value.kelasCounts[kelas].asrama_rumah)
    });

    // Menyusun series sesuai dengan format yang diinginkan
    state.series = [
      {
        name: 'Izin',
        data: izinData
      },
      {
        name: 'Sakit',
        data: sakitData
      },
      {
        name: 'Absen',
        data: absenData
      },
      {
        name: 'Pulang',
        data: pulangData
      }
    ];

    const kelasNames = Object.keys(value.kelasCounts).map(kelas => {
      return kelas.toUpperCase();
    });
    state.cate = kelasNames

    // sort data
    // Mengubah format asramatime menjadi objek Date dan mengurutkan data
    const sortedSantriData = value.SantriData.map(santri => {
      if (santri.Logs.asrama.time) {
        const dateTimeParts = santri.Logs.asrama.time.split(' ');

        if (dateTimeParts.length === 2) {
          const dateParts = dateTimeParts[0].split('-'); // Pisahkan hari, bulan, tahun
          const timeParts = dateTimeParts[1].split(':'); // Pisahkan jam, menit, detik

          if (dateParts.length === 3 && timeParts.length === 3) {
            const formattedDate = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]} ${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`);
            santri.Logs.asrama.time = formattedDate; // Mengubah string menjadi objek Date
          } else {
            console.error('Format waktu tidak valid');
          }
        } else {
          console.error('Format tanggal dan waktu tidak sesuai');
        }
      } else {
        console.warn('santri.Logs.asrama.time tidak ada isinya untuk santri')
      }

      return santri;
    });


    sortedSantriData.sort((a, b) => new Date(b.Logs.asramatime) - new Date(a.Logs.asramatime)); // Mengurutkan berdasarkan asramatime terbaru
    state.highlight = sortedSantriData; // Menetapkan data yang sudah diurutkan ke dalam state
    state.kelasCounts = value.kelasCounts
    const pegawaiData = [
      { status: "Mahad", jumlah: value.asrama_sekolah },
      { status: "Pulang", jumlah: value.asrama_rumah },
      { status: "Sakit", jumlah: value.asrama_sakit },
      { status: "Izin", jumlah: value.asrama_izin },
      { status: "Absen", jumlah: value.asrama_absen },
    ];

    // chart
    let sample
    sample = pegawaiData.map((item, index) => {
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
          labels: [''],
        },
      };
    });
    state.santriData = pegawaiData
    state.chartOptions = sample;
    state.santriData.forEach((item, index) => {
      const jumlahElement = document.getElementById(
        `jumlah-${index}`
      );
      if (jumlahElement) {
        jumlahElement.style.color = state.colors[index];
      }
    });
  }
}


