import Swal from "sweetalert2"

// date
const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, '0');
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default {
  async changeUnit({ commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    commit('setState', { key: 'start', value: date})
    commit('setState', { key: 'end', value: date})
    const resSelect = await this.$apiBase.$get(
      `get-settings?type=absensikelas&program=${program}`
    )
    if (resSelect.length > 0) {
      commit('setSelect', resSelect);
      dispatch('index/submitLoad', null, { root: true })
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Anda tidak mengajar mapel apapun",
      });
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getDataSantri({ commit, state, dispatch, rootState }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const kelas = state.selectedKelas
    const start = state.start
    const end = state.end
    const mapel = tambahkanGarisBawah(state.selectedMapel.Nama)

    if (!tahun && !semester) {
      dispatch('index/submitLoad', null, { root: true })
      return
    }

    commit('setState', { key: 'start', value: date})
    commit('setState', { key: 'end', value: date})

    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?method=kelas&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}&mapel=${mapel}`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getDataSantriByDate({ commit, state, dispatch, rootState }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const kelas = state.selectedKelas
    const start = state.start
    const end = state.end
    const mapel = tambahkanGarisBawah(state.selectedMapel.Nama)

    if (!tahun && !semester) {
      dispatch('index/submitLoad', null, { root: true })
      return
    }

    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?method=kelas&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}&mapel=${mapel}`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
}

let tambahkanGarisBawah = (teks) => {
  if (teks.includes(' ')) {
      return teks.split(' ').join('_');
  }
  return teks;
}
