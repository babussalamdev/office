export default {
    setMapel(state, value) {
        state.kelas = value.kelas
        state.jurusan = value.jurusan
        state.mapel = []
        state.setKelas = ''
    },
    setKelas(state, value) {
        state.mapel = value.mapel
    },
    setSelectKelas(state, value) {
        state.selectKelas = value
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
        data.Hari = value.Hari


        // if (i !== -1) {
        //     state.mapel[i] = { ...state.mapel[i], ...value };
        // }
    },
    deleteMapel(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value);
        state.mapel.splice(i, 1);
    },
}