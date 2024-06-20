export default {
  setPelanggaran(state, value) {
    // state.pelanggaran = value
    state.pelanggaran = value.pelanggaran
    state.struktur = value.struktur
  },
  inputStruktur(state, value) {
    state.pelanggaran.push(value);
    state.pelanggaran.sort((a, b) => {
      return a.Sort - b.Sort;
    });
  },
  deleteStruktur(state, value) {
    const i = state.pelanggaran.findIndex((x) => x.SK === value);
    state.pelanggaran.splice(i, 1);
  },
  updateStruktur(state, value) {
    const sk = value.SK.replace('%23', '#')
    const i = state.pelanggaran.findIndex((x) => x.SK === sk)

    const data = state.pelanggaran[i];
    data.Struktur = value.Struktur
    data.Permissions = value.Permissions
  },
}
