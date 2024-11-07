export default {
  getSelectKelas(state) {
    return state.selectKelas
  },
  filteredDatas(state) {
    const table = state.santri.filter((data) => {
      return data.Nama.toLowerCase().includes(state.search.toLowerCase());
    });
    return table
  },
  getPage(state) {
    return state.page
  },
  getSearch(state) {
    return state.search
  },
  getDateIzin(state) {
    return state.dateIzin
  }
}
