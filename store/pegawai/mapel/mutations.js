export default {
    setMain(state, value) {
        state.kelas = value.kelas
        state.jurusan = value.jurusan
        state.mapel = ''
    },
    setKelas(state, value) {
        state.mapel = value.mapel
    },
    updateHalaqah(state, value) {
        const i = state.pengampu.findIndex((x) => x.SK === value.SK)
        state.pengampu[i].Halaqah[value.Program] = value.Value
    },

}