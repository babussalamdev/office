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
        // const i = state.mapel.findIndex((x) => x.SK === value.SK)
        // state.mapel[i]['GSIPK1'] = value.GSIPK1
        state.mapel[0]['Tes'] = 'Hello World'
    },

}