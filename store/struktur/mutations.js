export default {
    setStruktur(state, value) {
        state.struktur = value
    },
    inputStruktur(state, value) {
        state.struktur.push(value);
        state.struktur.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    updateMapel(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value.SK)

        const data = state.mapel[i]
        data.Sort = value.Sort;
        data.Nama = value.Nama;
        data.Kelas = value.Kelas;
        data.Jurusan = value.Jurusan;


        // if (i !== -1) {
        //     state.mapel[i] = { ...state.mapel[i], ...value };
        // }
    },
    deleteStruktur(state, value) {
        const i = state.struktur.findIndex((x) => x.SK === value);
        state.struktur.splice(i, 1);
    },
}