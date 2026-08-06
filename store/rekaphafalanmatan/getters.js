export default {
  getStart(state) {
    return state.start;
  },
  getEnd(state) {
    return state.end;
  },

  // ADDED: Matan Getters
  getSelectedMatan(state) {
    return state.selectedMatan;
  },
  getListMatan(state) {
    return state.listMatan;
  },
};
