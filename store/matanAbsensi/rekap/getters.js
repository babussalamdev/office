export default {
  getStart(state) {
    return state.start;
  },
  getEnd(state) {
    return state.end;
  },
  getSelectedMatan(state) {
    return state.selectedMatan;
  },
  getSantri(state) {
    return state.santri;
  },
  // ADDED: Getters for dynamic class selection
  getKelas(state) {
    return state.kelas;
  },
  getSelectedKelas(state) {
    return state.selectedKelas;
  },
};
