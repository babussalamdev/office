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
        state.tahfidz2SubList = false;
      } else {
        state.absensiSubList = false;
        state.santriSubList = false;
        state.pegawaiSubList = false;
        state.databaseSubList = false;
        state.tahfidzSubList = false;
        state.tahfidz2SubList = false;
        state[list + 'SubList'] = !state[list + 'SubList'];
      }
    },
    // toggleSidebar(state) {
    //   console.log(state.isSidebar)
    //   state.isSidebar = state.isSidebar ? false : true;
    //   console.log(state.isSidebar)
    // },
    // tutupSidebar(state) {
    //   state.isSidebar = true
    // }
    TOGGLE_SIDEBAR(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    CLOSE_SIDEBAR(state) {
      state.isSidebarOpen = true;
    },
    OPEN_SIDEBAR(state) {
      state.isSidebarOpen = false;
    }
}
