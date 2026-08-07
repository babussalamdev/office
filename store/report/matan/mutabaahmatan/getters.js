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
  getListMatan(state) {
    return state.listMatan;
  },

  // ADDED: Kelas Getters
  getKelas(state) {
    return state.kelas;
  },
  getSelectedKelas(state) {
    return state.selectedKelas;
  },
};
