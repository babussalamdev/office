export default {
  getSelectKelas(state) {
    return state.selectKelas
  },
  filteredDatas(state) {
    const table = state.santri.filter((data) => {
      return data.Nama.toLowerCase().includes(state.search.toLowerCase());
    });
    let start = (state.page - 1) * state.perPage;
    let end = start + state.perPage;
    return table.slice(start, end);
  },
  getPage(state) {
    return state.page
  },
  getSearch(state) {
    return state.search
  }
}
