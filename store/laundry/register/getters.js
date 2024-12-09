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
  getSelectedAsrama(state) {
    return state.selectedAsrama
  },
  getSelectedAsramaModal(state) {
    return state.selectedAsramaModal
  },
  getSelectedDataModal(state) {
    return state.selectedDataModal
  }
}
