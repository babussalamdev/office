export default {
  setState(state, value) {
    state[value.key] = value.value
  },
  setSelectedMapel(state, value) {
    state.selectedMapel = value
  },
  setSelectedJam(state, value) {
    state.selectedJam = value
  },
  setSantri(state, value) {
    state.santri = value
  },
  setSelect(state, value) {
    state.select = value
    state.selectedJam = ''
  },
  setDataSantri(state, value) {
    state.santri = value
  },
  // setSantriTahfidz(state, value) {
  //   // if (value) {
  //   //   state.santri = value
  //   //   // state.permissions = value.resPermissions.split(',')
  //   //   // if (value.select) {
  //   //   //     state.select = value.select
  //   //   // }
  //   // } else {
  //   //   state.select = value
  //   //   state.santri = []
  //   //   state.permissions = []
  //   // }

  // },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        const updatedItem = { ...item };

        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs
        };

        return updatedItem;
      }
      return item;
    });

    state.santri = updatedSantri;

    const sekarang = new Date();

    // Mendapatkan tanggal, bulan, dan tahun
    const tanggal = sekarang.getDate().toString().padStart(2, '0');
    const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
    const tahun = sekarang.getFullYear();

    // Membuat string untuk tanggal dengan format "DD/MM/YYYY"
    const date = `${tahun}-${bulan}-${tanggal}`;

    state.dateNow = date
  },
  deleteAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs
        };

        return updatedItem;
      }
      return item;
    });

    // Mengganti data santri lama dengan data yang telah diperbarui
    state.santri = updatedSantri;
  },
  // setStatus(state, value) {
  //   state[value.name] = value.value
  // },
  setAbsensi(state, value) {
    // console.log(value)
    const i = state.santri.findIndex((x) => x.SK === value.sk)
    const obj = {
      santri: state.santri[i],
      type: value.type,
      time: value.time,
      mapel: state.selectedMapel.Nama,
      jam: state.selectedJam
    }
    state.updateData = obj
    $("#modalAbsen").modal("show");
  },
}
