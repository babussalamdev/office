export default {
  getKelas(state) {
    return state.kelas;
  },
  getUpdateData(state) {
    return state.updateData;
  },

  // Insert Getters
  GET_FROM_PAGE(state) {
    return state.fromPage;
  },
  GET_TO_PAGE(state) {
    return state.toPage;
  },

  // Update Getters
  getFromPageUpdate(state) {
    return state.fromPageUpdate;
  },
  getToPageUpdate(state) {
    return state.toPageUpdate;
  },

  getSelectedMatan(state) {
    return state.selectedMatan;
  },
  getSelectedMatanName(state) {
    return state.selectedMatanName;
  },

  getScoreUpdate(state) {
    return state.scoreUpdate;
  },
  getNoteUpdate(state) {
    return state.noteupdate;
  },
};
