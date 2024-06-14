export default {
    setPelanggaran(state, value) {
      state.pelanggaran = value
        // state.pelanggaran = value.pelanggaran
        // state.struktur = value.struktur
    },
    inputStruktur(state, value) {
        state.pelanggaran.push(value);
        state.pelanggaran.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteStruktur(state, value) {
        const sk = value.replace('%23', '#')
        const i = state.pelanggaran.findIndex((x) => x.SK === sk);
        state.pelanggaran.splice(i, 1);
    },
    updateStruktur(state, value) {
        const i = state.pelanggaran.findIndex((x) => x.SK === value.SK)

        const data = state.pelanggaran[i];
        data.Nama = value.Nama
        data.Permissions = value.Permissions
    },
}
