export default {
  filteredDatas(state) {
    const dataJson = state.santri.filter((data) => {
      return data.Nama.toLowerCase().includes(state.search.toLowerCase())
    })
    let start = (state.page -1) * state.perPage
    let end = start + state.perPage
    return dataJson.slice(start, end)
  },
  getAngkatan(state) {
    return state.angkatan
  },
  getSelectBy(state) {
    return state.selectBy
  },
  getKelas(state) {
    return state.kelas
  },
  getPage(state) {
    return state.page
  },
  getSearch(state) {
    return state.search
  }
}
