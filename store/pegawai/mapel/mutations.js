export default {
    setMain(state, value) {
        state.kelas = value.kelas
        state.jurusan = value.jurusan
        state.mapel = ''
    },
    setKelas(state, value) {
        state.mapel = value.mapel
        state.pengajar = value.pengajar
    },
    setPengajar(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value.SK)
        const data = state.mapel[i];
        data['GSIPK1'] = value.GSIPK1

        const updatedData = state.mapel.map((item, index) => {
            if (index === i) {
                return data;
            }
            return item;
        });

        state.mapel = updatedData
    },
}
