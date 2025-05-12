
import Swal from "sweetalert2"
export default {
  globalLoad(state) {
    state.globalLoad = state.globalLoad ? false : true
  },
  setState(state, data) {
    if (data.key === 'santri') {
      state[data.key] = data.value
    } else if (data.key === 'select') {
      state.santri = []
      state.selectedEkskull = ''
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  },
  setPenilaian(state, data) {
    if (data['type'] === 'set' && !state.nilai) {
      if (data['skSantri']) {
        state.santri[data.index].Nilai = state.santri[data.index].Nilai.toString()
        state.nilai = state.santri[data.index].Nilai

        if (state.santri[data.index].Nilai) {
          state.openEdit = data
        }
      }
    } else if (data['type'] === 'close') {
      state.santri[state.openEdit.index].Nilai = +state.nilai
      state.nilai = 0
      state.openEdit = ''
    } else if (data['type'] === 'button') {
      state.santri[state.openEdit.index].Nilai = +state.nilai
      state.openEdit = ''
      state.nilai = 0
    }
  },

  // partikel settings kelas
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
