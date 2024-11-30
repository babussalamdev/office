export default {
  getSearch(state) {
    return state.search
  },
  filteredDatas(state) {
    const dataJson = state.datas.filter((data) => {
      return data.Name.toLowerCase().includes(state.search.toLowerCase())
    })
    return dataJson
  }
}
