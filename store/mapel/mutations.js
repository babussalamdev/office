export default {
    setMapel(state, value) {
        state.mapel = value
    },
    inputMapel(state, value) {
        state.mapel.push(value);
        state.mapel.sort((a, b) => {
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
    },
    deleteMapel(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value);
        state.mapel.splice(i, 1);
    },
}