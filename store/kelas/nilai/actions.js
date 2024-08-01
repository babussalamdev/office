import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(
      `get-nilai?subject=pengajar&program=${program}`
    );
    commit('setUnit', result);
  },
  async getSantri({ commit, state }, data) {
    console.log('berhasil')
    const program = localStorage.getItem('program')
    const datas = {}
    datas['Filter'] = state.selectedMapel.Jurusan
    datas['Kelas'] = state.selectedMapel.Kelas
    datas['Subject'] = state.selectedMapel.Nama
    datas['Tahun'] = this.$auth.user.Label
    datas['Semester'] = this.$auth.user.Semester
    datas['Penilaian'] = state.selectedMapel.Penilaian
    const result = await this.$apiSantri.$put(
      `get-nilai-sisalam?program=${program}`, datas
    )
    const obj = { key: 'santri', value: result.data }
    commit('setState', obj)
  },
  async setPenilaian({ commit, state }, data) {
    if (state.openEdit) {
      console.log('close')
      data['type'] = 'close'
      commit('setPenilaian', data)

    }
    // if (state.openEdit) {
    //   data['type'] = 'tutup'
    //   commit('openEdit', data)
    //   try {
    //     console.log({ nilai: +state.nilai })
    //     console.log('panggil api')
    //   } catch (error) {

    //   }
    // }

    // close
    if (data) {
      console.log(state.openEdit)
      data['type'] = 'set'
      commit('setPenilaian', data)
    }
  }
}
