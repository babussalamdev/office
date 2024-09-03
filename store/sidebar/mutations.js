export default {
    notClick(state, list) {
        state[list] = !state[list]
    },
    notClickSub(state, list) {
      if (state[list + 'SubList'] === true) {
        state.absensiSubList = false;
        state.santriSubList = false;
        state.pegawaiSubList = false;
        state.databaseSubList = false;
        state.tahfidzSubList = false;
      } else {
        state.absensiSubList = false;
        state.santriSubList = false;
        state.pegawaiSubList = false;
        state.databaseSubList = false;
        state.tahfidzSubList = false;
        state[list + 'SubList'] = !state[list + 'SubList'];
      }
    },
    toggleSidebar(state) {
      state.isSidebar = state.isSidebar ? false : true;
    },
}
