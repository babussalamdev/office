import Swal from "sweetalert2"
export default {
  async getData({ dispatch, commit, state }, qrCode) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-log?type=koordinator-scan&qrcode=${qrCode}`)
      if (result) {
        commit('setState', { key: 'listJob', value: result })
        dispatch('index/submitLoad', null, { root: true })

        this.$router.push('/kebersihan/rekap')
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async doneItem({ commit, state }, SK) {
    const pk = state.listJob.find((x) => x.SK === SK).PK
    const sk = SK.replace('#', '%23')
    const data = {
      Status: 'done'
    }
    try {
      const result = await this.$apiOB.$put(`update-log?value=${pk}&sk=${sk}`, data)
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Pekerjaan telah diupdate!",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('doneItem', SK)
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async failedItem({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const pk = state.updateData.PK
    const sk = state.updateData.SK.replace('#', '%23')
    const request = {
      Status: 'failed',
      Note: data.Catatan
    }
    try {
      const result = await this.$apiOB.$put(`update-log?value=${pk}&sk=${sk}`, request)
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Pekerjaan telah diupdate!",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('failedItem', state.updateData.SK)
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
