export default {
  setState(state, value) {
    state[value.key] = value.value;
  },
  setEkskullOptions(state, value) {
    state.ekskullOptions = value;
  },
  setSelectedEkskull(state, value) {
    state.selectedEkskull = value;
    state.santri = []; // Clear santri when changing ekskull
  },
  setSantri(state, value) {
    state.santri = value;
  },
  setDataSantri(state, value) {
    state.santri = value;
  },
  btn(state) {
    state.btn = !state.btn;
  },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        return { ...item, Logs: { ...item.Logs, ...value.Logs } };
      }
      return item;
    });

    state.santri = updatedSantri;
    $("#santriAbsen")[0].reset();
    $("#modalAbsen").modal("hide");
  },
  deleteAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        return { ...item, Logs: { ...item.Logs, ...value.Logs } };
      }
      return item;
    });
    state.santri = updatedSantri;
  },
  setAbsensi(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.sk);
    state.updateData = {
      santri: state.santri[i],
      type: value.type,
      time: value.time,
      ekskull: state.selectedEkskull, // Save selected Ekskull for the API call
    };
    $("#modalAbsen").modal("show");
  },
};
