export default {
  setState(state, data) {
    state[data.key] = data.value;
  },
  setLoad(state, data) {
    state.btn = state.btn ? false : true;
  },
  setSantriAsrama(state, value) {
    // console.log(value)
    state.santri = [];
    state.search = "";
    state.selectKelas = "";
    if (value.resSelect) {
      state.select = value.resSelect;
      state.santri = [];
      state.permissions = [];
    } else {
      state.santri = value.resSantri;
      state.permissions = value?.resPermissions ?? [];

      state.select = [];
    }
  },
  setSantriAsramaManual(state, value) {
    state.santri = value.resSantri;
    state.permissions = value.resPermissions.split(",");
  },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs,
        };

        return updatedItem;
      }
      return item;
    });

    state.santri = updatedSantri;
    state.updateData = "";

    $("#santriAbsenInput")[0].reset();
    $("#modalAbsen").modal("hide");
  },
  updateAbsenSantri(state, value) {
    $("#santriAbsenInput")[0].reset();
    $("#modalAbsen").modal("hide");
    state.updateData = "";
  },
  deleteIzin(state, sk) {
    const i = state.santriIzin.findIndex((x) => x.SK === sk);
    state.santriIzin.splice(i, 1);
  },
  updateItem(state, sk) {
    const i = state.santriIzin.findIndex((x) => x.SK === sk);
    state.updateDataIzin = state.santriIzin[i];
    $("#modalIzin").modal("show");
  },
  updateIzin(state, data) {
    const i = state.santriIzin.findIndex((x) => x.SK === data.SK);
    const updatedIzin = state.santriIzin.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item, ...data };

        return updatedItem;
      }
      return item;
    });
    state.santriIzin = updatedIzin;
    $("#modalIzin").modal("hide");
    $("#santriIzinUpdate")[0].reset();
  },
};
