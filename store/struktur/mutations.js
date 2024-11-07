export default {
  setStruktur(state, value) {
    state.struktur = value
  },
  inputModal(state, value) {
    $("#inputDataStruktur").modal("show");
    state.value = []
  },
  inputStruktur(state, value) {
    state.struktur.push(value);
    state.struktur.sort((a, b) => {
      return a.Sort - b.Sort;
    });
    state.value = [];
    $("#inputDataStruktur").modal("hide");
    $("#inputStruktur")[0].reset();
  },
  editItem(state, value) {
    const i = state.struktur.findIndex((x) => x.SK === value)
    state.updateData = state.struktur[i];

    const permissions = state.updateData.Permissions.split(",");
    if (permissions && permissions.length > 0) {
      const mappedArray = permissions.map((x) => {
        const option = state.options.find((option) => option.name === x);
        return { name: x, code: option ? option.code : null };
      });
      state.value = mappedArray;
    }

    $("#updateDataStruktur").modal("show");
  },
  deleteValue(state, value) {
    state.value = []
  },
  updateDataStruktur(state, value) {
    const sk = value.SK.replace('%23', '#')
    const i = state.struktur.findIndex((x) => x.SK === sk)

    const data = state.struktur[i];
    data.Sort = value.Sort;
    data.Nama = value.Nama
    data.Permissions = value.Permissions

    state.value = [];
    $("#updateDataStruktur").modal("hide");
    $("#updateStruktur")[0].reset();
  },
  deleteStruktur(state, value) {
    const sk = value.replace('%23', '#')
    const i = state.struktur.findIndex((x) => x.SK === sk);
    state.struktur.splice(i, 1);
  },

  // partikel
  setValue(state, value) {
    state.value = value
  },
  btn(state) {
    state.btn = state.btn ? false : true
  },
}
