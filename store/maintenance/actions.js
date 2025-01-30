import Swal from "sweetalert2"

const today = new Date();
const year = today.getFullYear();
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let day = today.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

export default {
  async inputLaporan({ commit, state, dispatch }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const qrcode = state.decodedText.replace(/#/g, '%23')
    try {
      const result = await this.$apiOB.$get(`get-log?type=report-scan&qrcode=${qrcode}&note=${data.laporan}`)
      if (result) {
        Swal.fire({
          text: 'Laporan berhasil terkirim!',
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        commit('resetLaporan')
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async changeUnitReport({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-default?type=gedung`)
      if (result) {
        commit('setState', { key: 'listGedung', value: result})
        commit('setState', { key: 'start', value: formattedDate })
        commit('setState', { key: 'end', value: formattedDate })
        commit('resetData')
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getReport({ state, dispatch, commit }) {
    dispatch('index/submitLoad', null, { root: true })
    const start = state.start
    const end = state.end
    const gedung = state.selectedGedung
    commit('setState', { key: 'selectedRuang', value: '' })
    try {
      const result = await this.$apiOB.$get(`get-log?mode=gedung&startdate=${start}&enddate=${end}&gedung=${gedung}`)
      if (result) {
        commit('setState', { key: 'listLaporan', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
