export default {
  setDataHalaqah(state, value) {
    state.halaqah = value.resResult
    state.selectKelas = value.resKelas
  },
  setDataAsrama(state, value) {
    state.asrama = value
  },
  updateHalaqah(state, value) {
    state.halaqah.push(value);
    state.halaqah.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputHalaqah")[0].reset()
    $("#InputDataHalaqoh").modal("hide");
  },
  deleteHalaqah(state, value) {
    const i = state.halaqah.findIndex((x) => x.SK === value);
    state.halaqah.splice(i, 1);
  },
  updateAsrama(state, value) {
    state.asrama.push(value);
    state.asrama.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputAsrama")[0].reset()
    $("#InputDataAsrama").modal("hide");

  },
  deleteAsrama(state, value) {
    const i = state.asrama.findIndex((x) => x.SK === value);
    state.asrama.splice(i, 1);
  },

  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  },

  // halaqah
  editHalaqah(state, value) {
    const i = state.halaqah.findIndex((x) => x.SK === value)
    state.updateData = state.halaqah[i]
    $('#updateHalaqahModal').modal('show')
  },
  setKelasHalaqah(state, value) {
    const i = state.halaqah.findIndex((x) => x.SK === value.sk)
    const updatedHalaqah = state.halaqah.map((item, index) => {
      if ( index === i) {
        const updateItem = { ...item, ...value }
        return updateItem
      }
      return item
    })
    state.halaqah = updatedHalaqah
    $('#updateHalaqahModal').modal('hide')
    $('#formUpdate')[0].reset()
  }
}
