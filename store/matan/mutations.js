export default {
  btn(state) {
    state.btn = !state.btn;
  },
  setState(state, data) {
    state[data.key] = data.value;
  },
  setKelas(state, data) {
    state.kelas = data.kelas;
    state.matan = data.matan;
    state.periode = data.periode;
  },
  inputMatan(state, value) {
    const i = state.matan.findIndex((x) => x.SK === value.SK);
    state.matan.push(value);
    state.matan.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputmatan").modal("hide");
    $("#inputMatan")[0].reset();
  },
  deleteMatan(state, value) {
    const i = state.matan.findIndex((x) => x.SK === value);
    state.matan.splice(i, 1);
  },

  // penilaian
  updateItem(state, value) {
    const i = state.matan.findIndex((x) => x.SK === value);

    $("#updatematan").modal("show");
    state.updateDataMatan = state.matan[i];
  },
  updateMatan(state, value) {
    // Update data
    const updatedData = state.matan.map((item) => (item.SK === value.SK ? { ...item, ...value } : item));

    state.matan = updatedData;
    $("#updateMatan")[0].reset();
    $("#updatematan").modal("hide");
  },
};
