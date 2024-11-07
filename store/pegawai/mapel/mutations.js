export default {
  setState(state, value) {
    state[value.key] = value.value
  },
  setMain(state, value) {
    state.kelas = value.kelas
    state.jurusan = value.jurusan
    state.mapel = ''
  },
  setKelas(state, value) {
    state.mapel = value.mapel
    const sortedPengajar = value.pengajar.sort((a, b) => {
      // Bandingkan nama dengan localeCompare
      return a.Nama.localeCompare(b.Nama);
    })
    state.pengajar = sortedPengajar
  },
  setPengajar(state, value) {
    value['SK'] = value.SK.replace(/%23/g, "#")

    const updatedData = state.mapel.map(item =>
      item.SK === value.SK ? { ...item, ...value } : item
    );

    state.mapel = updatedData

    const i = state.mapel.findIndex((x) => x.SK )

    $("#updateMapel")[0].reset();
    $("#mapelSetupModal").modal("hide");

  },
  editItem(state, data) {
    const index = state.mapel.findIndex((x) => x.SK === data)
    state.updateData = state.mapel[index];
    if ( state.updateData.skpengajar ) {
      const i = state.pengajar.findIndex((x) => x.SK === state.updateData.skpengajar)
      state.pengajarShow = state.pengajar[i]
    } else {
      state.pengajarShow = ''
    }
    console.log(state.pengajarShow)
    $("#mapelSetupModal").modal("show");
  },


  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
