export default {
  getWaktuSiang(state) {
    if (state.datas) {
      const i = state.datas?.findIndex((x) => x.SK.split('#')[1] === 'siang')
      return state.datas[i]
    }
  },
  getWaktuMalam(state) {
    if (state.datas) {
      const i = state.datas?.findIndex((x) => x.SK.split('#')[1] === 'malam')
      return state.datas[i]
    }
  },
  getSelectedAsrama(state) {
    return state.selectedAsrama
  }
}
