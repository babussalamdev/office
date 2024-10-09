import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const reqKelas = this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    const reqSantri = this.$apiSantri.$get(`get-santri-sisalam?program=smp&opsi=&method=card&type=`)
    const [resKelas, resSantri] = await Promise.all([reqKelas, reqSantri])
    if ( resKelas, resSantri ) {
      commit('SET_STATE', { key: 'kelas', value: resKelas.kelas })
      commit('SET_STATE', { key: 'santri', value: resSantri })
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getData({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const kelas = state.selectedKelas
    try {
      const result = await this.$apiSantri.$get(`get-santri-sisalam?program=smp&opsi=${kelas}&method=card&type=kelas`)
      commit('SET_STATE', { key: 'santri', value: result })
      dispatch('index/submitLoad', null, { root: true })
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
  async inputCard({ commit, state, dispatch }, event) {
    try {
      const data = Object.fromEntries(new FormData(event.target))
      const result = await this.$apiCard.$post(`create-card`, data)
      if ( result ) {
        commit('INPUT_CARD', result)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }

  },
  async deleteItem({ commit, state, dispatch }, cnc) {
    const i = state.santri.findIndex((x) => x.CNC === cnc)
    const name = state.santri[i].CNC
    const result = await Swal.fire({
      title: name,
      text: "Kartu akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      dispatch('index/submitLoad', null, { root: true })
      try {
        const datas = await this.$apiCard.$delete(`delete-card?sk=${cnc}`)
        if (datas) {
          commit('DELETE_ITEM', cnc)
          Swal.fire({
            position: "center",
            icon: "success",
            text: 'berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
          });
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
    }
  },
}
