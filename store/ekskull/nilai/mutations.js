
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
    if (data['type'] === 'set') {
      if (data['skSantri']) {
        state.santri[data.index].Nilai = state.santri[data.index].Nilai.toString()
        state.nilai = state.santri[data.index].Nilai

        if (state.santri[data.index].Nilai) {
          state.openEdit = data
        }
      }
    } else if (data['type'] === 'close') {
      if (state.santri[state.openEdit.index].Nilai > 100) {
        Swal.fire({
          title: 'Warning!',
          text: 'Nilai tidak boleh lebih dari 100.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
      state.santri[state.openEdit.index].Nilai = +state.nilai
      state.nilai = 0
    } else if (data['type'] === 'button') {
      state.santri[state.openEdit.index].Nilai = +state.nilai
      state.openEdit = ''
    }
  },

  // partikel settings kelas
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
