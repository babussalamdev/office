export default {
  filteredDatas(state) {
    const dataJson = state.listLaporan.filter((data) => {
      return data.Name.toLowerCase().includes(state.selectedRuang.toLowerCase());
    });
    return dataJson
  },
  getSelectedMode(state) {
    return state.selectedMode
  },
  getSelectedGedung(state) {
    return state.selectedGedung
  },
  getSelectedCrew(state) {
    return state.selectedCrew
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
