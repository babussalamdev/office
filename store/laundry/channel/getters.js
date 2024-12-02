export default {
  filteredDatas(state) {
    const dataJson = state.datas.filter((data) => {
      return data.Name.toLowerCase().includes(state.search.toLowerCase())
    })
    return dataJson
  },
  getSearch(state) {
    return state.search
  },
  getType(state) {
    return state.type
  }
}
