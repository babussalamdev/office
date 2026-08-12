export default {
  setState(state, data) {
    if (data.key === "datas") {
      // ONLY update datas.
      // Do NOT reset selectedKelas here, otherwise the dropdown clears itself after fetching!
      state[data.key] = data.value;
    } else if (data.key === "reset") {
      // This is triggered by handleKelasChange in the component
      state.values = [];
      state.selectedMatan = "";
      state.datas = []; // Optional: clears the matan dropdown until the new API call finishes
    } else {
      state[data.key] = data.value;
    }
  },

  btn(state) {
    state.btn = !state.btn;
  },

  editItem(state, data) {
    const i = state.values.findIndex((x) => x.SK === data);
    state.updateData = state.values[i];
    $("#updateModalJurnal").modal("show");
  },

  setValues(state, data) {
    state.values.push(data);
    $("#inputModalJurnal").modal("hide");
    $("#modalInput")[0].reset();
  },

  updateValues(state, data) {
    const i = state.values.findIndex((x) => x.SK === state.updateData.SK);
    const datas = state.values[i];
    datas.Description = data.Description;
    datas.Occurrence = data.Occurrence;
    $("#updateModalJurnal").modal("hide");
  },
};
