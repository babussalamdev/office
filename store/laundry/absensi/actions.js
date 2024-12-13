import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const reqPegawai = await this.$apiBase.$get(
      `get-absensi?subject=absensiauthority&authority=laundry`
    );
    if (reqPegawai) {
      commit('setPegawai', reqPegawai);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async deleteStatus({ commit, state, dispatch }, datas) {
    dispatch('index/submitLoad', null, { root: true })
    const req = await this.$apiBase.$delete(
      `delete-absensi?authority=laundry&skpegawai=${datas.sk}`
    );
    if (req) {
      req["SK"] = datas.sk;
      commit('deleteAbsen', req);
      dispatch('index/submitLoad', null, { root: true })
    }
  },

  // detail
  async changeUnitDetail({ commit, state, dispatch }, id) {
    dispatch('index/submitLoad', null, { root: true })
    const today = new Date().toISOString().split('T')[0];
    commit('setState', { key: 'start', value: today })
    commit('setState', { key: 'end', value: today })
    try {
      const result = await this.$apiBase.$get(`get-absensi?subject=authoritydetails&authority=laundry&startdate=${state.start}&enddate=${state.end}&skpegawai=${id}`)
      if (result) {
        commit('setAbsensiDetail', result)
        dispatch('index/submitLoad', null, { root: true })
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
  async getByDate({ commit, state, dispatch }, id) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiBase.$get(`get-absensi?subject=authoritydetails&authority=laundry&startdate=${state.start}&enddate=${state.end}&skpegawai=${id}`)
      if (result) {
        commit('setAbsensiDetail', result)
        dispatch('index/submitLoad', null, { root: true })
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

  // rekap
  async changeUnitRekapAbsensi({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const today = new Date().toISOString().split('T')[0];
    commit('setState', { key: 'startRekap', value: today })
    commit('setState', { key: 'endRekap', value: today })
    try {
      const result = await this.$apiBase.$get(`get-absensi?subject=recapauthority&authority=laundry&startdate=${state.startRekap}&enddate=${state.endRekap}`)
      if (result) {
        commit('setRekap', result)
        dispatch('index/submitLoad', null, { root: true })
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
  }
}
