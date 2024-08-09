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
      return state.table.slice(start, end);
  }
}
