export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  SET_DATAS(state, data) {
    state.santri = []
    state.selectedAsrama = ''
    state.datas = data.resTime
    state.listAsrama = data.resAsrama
  },
  SET_TIME(state, data) {
    const program = localStorage.getItem('program')
    const sk = `${program}#${data.sk}`
    const i = state.datas.findIndex((x) => x.SK === sk)
    state.datas[i][data.step] = data.date
    state.santri = []
    state.selectedAsrama = ''
  },
  SET_TIDUR(state, data) {
    const i = state.santri.findIndex((x) => x.SK === data.SK)
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.Logs = {
          ...item.Logs,
          ...data.Logs
        };

        return updatedItem;
      }
      return item;
    });
    state.santri = updatedSantri;
  }
}
