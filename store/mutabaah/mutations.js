export default {

  setSantri(state, value) {
    state.santri = value
  },

  // mutabaah details
  showDetail(state, value) {
    localStorage.setItem("subject", value.subject);
    const i = state.santri.findIndex((x) => x.SK === value.sk)
    state.detail = state.santri[i]
    this.$router.push(`/tahfidz/mutabaah/${value.sk.replace('#', '%23')}`)
  },
  setSurah(state, value) {
    state.surah = value
  },
  setDetailSantri(state, value) {
    state.detailMutabaah = value
  },
  pushDetail(state, value) {
    state.detailMutabaah.push(value)
  },
  editItem(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value)
    state.updateData = state.detailMutabaah[i]
    if (state.updateData) {
      $('#mutabaahupdate').modal('show')
    }
    // state.mt++
  },
  updateDetail(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value.SK)
    const data = state.detailMutabaah[i]
    data.Score = value.Score
    data.Page = value.Page

  },
  deleteDetail(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value)
    state.detailMutabaah.splice(i, 1)
  },

  // modal
  setSurahFrom(state, value) {
    state.updateData.From.name = value.name
    state.updateData.From.ayat = { number: '', page: '', juz: '' }
  },
  setSurahTo(state, value) {
    state.updateData.To.name = value.name
    state.updateData.To.ayat = { number: '', page: '', juz: '' }
  },
  setAyatFrom(state, value) {
    state.updateData.From.ayat = value
  },
  setAyatTo(state, value) {
    state.updateData.To.ayat = value
  },
  setNote(state, value) {
    state.updateData.Note = value
  },
  setHalaqah(state, data) {
    state.listHalaqah = data
    state.santri = []
    state.selectedHalaqah = ''
  },
  setState(state, data) {
    state[data.key] = data.value
  }

  // resetmt(state) {
  //   state.mt = 0
  // },
  // addmt(state) {
  //   state.mt++
  // }
  // setSelectKelas(state, value) {
  //   state.santri = []
  //   state.select = value
  //   state.kelas = ''
  // },
  // setKelas(state, value) {
  //   state.kelas = value
  // },
  // editBulk(state, value) {
  //   $("#updateDataSantriAsrama").modal("show");
  //   state.updateData = value;
  // },
  // setAsramaShow(state, value) {
  //   console.log('done')
  //   state.asramaShow = value
  // },
  // updateAsramaSantri(state, data) {
  //   const updatedData = state.santri.map(item => {
  //     // Cari objek dalam state.santri yang memiliki SK yang sama dengan yang ada di data.sort
  //     if (data.sort.includes(item.SK)) {
  //       // Salin objek agar tidak memodifikasi state langsung
  //       const updatedItem = { ...item };
  //       // Perbarui nilai 'Kelas' dari objek yang ditemukan
  //       updatedItem['Asrama'] = data.value;
  //       return updatedItem;
  //     }
  //     return item; // Kembalikan objek tanpa modifikasi jika tidak ada yang sesuai
  //   });

  //   // Perbarui state dengan data yang diperbarui
  //   state.santri = updatedData;

  //   state.asramaShow = "";
  //   $("#updateDataSantriAsrama").modal("hide");
  // },

  // btn(state) {
  //   state.btn = state.btn ? false : true
  // }
}
