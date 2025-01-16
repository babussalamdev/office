import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-default?type=gedung`)
      if (result) {
        commit('setState', { key: 'listGedung', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async getJob({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const type = state.selectedGedung
    try {
      const result = await this.$apiOB.$get(`get-job?type=${type}`)
      if (result) {
        commit('setData', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async inputData({ commit, state, dispatch }, { event, input }) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const gedung = state.selectedGedung
    data['Name'] = input.map(item => item.trim()).join(',')

    // cek ruangan
    const job = state.job
    const inputRuangan = state.ruangan.find((x) => x.SK === data.SK)?.Name
    const inputPK = data.PK
    const cekRuangan = (job, inputRuangan, inputPK) => {
      return job.some(item => item.Ruangan === inputRuangan && item.PK === inputPK)
    }
    try {
      // Pengecekan dan peringatan
      if (cekRuangan(job, inputRuangan, inputPK)) {
        Swal.fire({
          icon: 'warning',
          text: 'Ruangan sudah terisi!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        const result = await this.$apiOB.$post(`input-job?type=${gedung}`, data)
        if (result) {
          commit('inputData', result)
          commit('btn')
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async updateItem({ commit, state, dispatch }, { input }) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const value = state.updateData.PK
    const sk = state.updateData.SK
    data['Name'] = input.map(item => item.trim()).join(',')
    try {
      const result = await this.$apiOB.$put(`update-job?value=${value}&sk=${sk}`, data)
      result['PK'] = value
      result['SK'] = sk
      if (result) {
        commit('updateData', result)
        commit('btn')
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diupdate!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async deleteItem({ commit, state, dispatch }, sk) {
    const i = state.job.findIndex((x) => x.SK === sk)
    const result = await Swal.fire({
      title: state.job[i].SK,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await this.$apiOB.$delete(
        `delete-job?value=${state.job[i].PK}&sk=${sk}`
      );
      commit('deleteItem', sk);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
}
