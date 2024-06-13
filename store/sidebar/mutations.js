export default {
    notClick(state, list) {
        state[list] = !state[list]
    },
    notClickSub(state, list) {
        state.absensiSubList = false;
        state.santriSubList = false;
        state.pegawaiSubList = false;
        state.databaseSubList = false;
        state[list + 'SubList'] = !state[list + 'SubList'];
    },
}
