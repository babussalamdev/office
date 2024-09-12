export default {
  filteredDatas(state) {
    const dataJson = state.pegawai.filter((data) => {
      return data.Nama.toLowerCase().includes(state.search.toLowerCase());
    });
    let start = (state.page - 1) * state.perPage;
    let end = start + state.perPage;
    return dataJson.slice(start, end);
  },
  getValue(state) {
    return state.value
  },
  getJabatan(state) {
    return state.jabatanShow
  },
  getSearch(state) {
    return state.search
  },
  getPage(state) {
    return state.page
  }
}
