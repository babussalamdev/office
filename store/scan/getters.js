export default {
  filteredDatas(state) {
    const dataJson = state.listLaporan.filter((data) => {
      return data.Location.toLowerCase().includes(state.selectedRuang.toLowerCase());
    });
    return dataJson
  },
  getSelectedGedung(state) {
    return state.selectedGedung
  },
  getSelectedRuang(state) {
    return state.selectedRuang
  },
  getStart(state) {
    return state.start
  },
  getEnd(state) {
    return state.end
  }
}
