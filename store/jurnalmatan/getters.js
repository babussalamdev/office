export default {
  getDate(state) {
    return state.date;
  },
  getSelectedMatan(state) {
    return state.selectedMatan;
  },
  getSelectedKelas(state) {
    return state.selectedKelas;
  },
  // ADDED: Getter for the dynamic class list
  getKelas(state) {
    return state.kelas;
  },
};
