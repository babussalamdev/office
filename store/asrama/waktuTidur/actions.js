import Swal from "sweetalert2"
export default {
  async changeUnit({ state, dispatch, commit }) {
    const program = localStorage.getItem('program')
    const reqTime = this.$apiBase.$get(`get-settings?program=${program}&type=tidur`)
    const reqAsrama = this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=asrama`)
    const [resTime, resAsrama] = await Promise.all([reqTime, reqAsrama])
    if ( resTime && resAsrama ) {
      commit('SET_DATAS', { resTime, resAsrama })
    }
  },
  async setTime({ state, dispatch, commit }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    try {
      const step = data.step
      const request = {
        "Nama" : data.time,
        "Program" : program,
        [step] : data.date
      }
      const result = await this.$apiBase.$put(`update-settings?type=tidur&sk=${program}%23${data.sk}`, request)
      if ( result ) {
        commit('SET_TIME', data)
        dispatch('index/submitLoad', null, { root: true })
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Jam berhasil diupdate",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getData({ state, dispatch, commit }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const asrama = state.selectedAsrama
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiSantri.$get(`get-absensi-sisalam?subject=asrama&value=${asrama}&program=${program}&type=tidur`)
      if ( result ) {
        commit('setState', { key: 'santri', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });

    }
  },
  async setTidur({ state, dispatch, commit }, data) {
    console.log(data)
    dispatch('index/submitLoad', null, { root: true })
    try {
      const sk = data.sk.replace('#', '%23')
      const program = localStorage.getItem('program')
      const type = data.type
      const datas = {
        Note: "",
        Status: !data.status ? 'istirahat' : data.status === 'istirahat' ? 'aktivitas' : 'istirahat'
      }
      const result = await this.$apiSantri.$put(`update-absensi-sisalam?program=${program}&type=${type}&sksantri=${sk}`, datas)
      if (result) {
        dispatch('index/submitLoad', null, { root: true })
        result['SK'] = data.sk
        commit('SET_TIDUR', result)
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }

  }
}
