export default {
  filteredDatas(state) {
    const dataJson = state.datas.filter((item) => {
      return item.Nama.toLowerCase().includes(state.search.toLowerCase())
    })
    return dataJson
  },
  getSearch(state) {
    return state.search
  }
}
