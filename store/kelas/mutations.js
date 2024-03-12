export default {
    setData(state, value) {
        state.kelas = value.kelas
        state.jurusan = value.jurusan
        state.ekskull = value.ekskull
    },
    updateKelas(state, value) {
        state.kelas.push(value);
        state.kelas.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteKelas(state, value) {
        const i = state.kelas.findIndex((x) => x.SK === value);
        state.kelas.splice(i, 1);
    },
    updateJurusan(state, value) {
        state.jurusan.push(value);
        state.jurusan.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteJurusan(state, value) {
        const i = state.jurusan.findIndex((x) => x.SK === value);
        state.jurusan.splice(i, 1);
    },
    updateEkskull(state, value) {
        state.ekskull.push(value);
        state.ekskull.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteEkskull(state, value) {
        const i = state.ekskull.findIndex((x) => x.SK === value);
        state.ekskull.splice(i, 1);
    },
}