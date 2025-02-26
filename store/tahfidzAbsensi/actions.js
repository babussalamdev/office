import Swal from "sweetalert2"

export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const asrama = this.$auth.user.Asrama[program]
    const halaqah = this.$auth.user.Halaqah[program]
    const kelas = this.$auth.user.Kelas[program]

    let subject = ''
    if (jabatan === 'musyrif') {
      subject = 'asrama'
    } else {
      subject = 'kelas'
    }
    const reqAbsen = this.$apiBase.$get(`get-settings?type=session&sk=${program}`)
    const reqSantri = this.$apiSantri.$get(
      `get-absensi-sisalam?type=every&subject=halaqah&program=${program}&value=${halaqah}`
    );
    const [ resAbsen, resSantri ] = await Promise.all([ reqAbsen, reqSantri ])
    if (resAbsen, resSantri) {
      commit('setSantriTahfidz', resSantri);
      commit('setAbsen', resAbsen);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getAbsensi({ commit }, data) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const result = await this.$axios.$get(
      `get-absensi?subject=kelas&program=${program}&kelas=${data}&absen=asrama&name=${jabatan}`
    );

    commit('setSantriAsrama', result);
  },
  setStatus({ commit, state }, data) {
    const waktu = data
    const sk = state[data].split(' ')[1]
    const type = state[data].split(' ')[0]
    const obj = {
      waktu: waktu,
      sk: sk,
      type: type
    }
    // console.log(data)
  },
  async deleteStatus({ commit, state, dispatch, rootState }, datas) {
    dispatch('index/submitLoad', null, { root: true })
    const i = state.santri.findIndex((x) => x.SK === datas.sk)
    const data = state.santri[i]
    const time = datas.time
    const sk = data.Logs.halaqah[time].time
    const skSantri = datas.sk.replace('#', '%23')
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const program = localStorage.getItem("program");
    const req = await this.$apiSantri.$delete(
      `delete-absensi-sisalam?sksantri=${skSantri}&type=halaqah${time}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${sk}&status=${datas.condition}`
    );
    if (req) {
      req['time'] = time
      req["SK"] = datas.sk;
      commit('deleteAbsen', req);
      dispatch('index/submitLoad', null, { root: true })
    }
  },

  // catatan
  async updatecatatanpagi({ commit, state, rootState }, event) {
    const data = Object.fromEntries(new FormData(event.target))
    const skSantri = state.updateDataCatatan.SK.replace('#', '%23')
    const program = localStorage.getItem('program')
    commit('btncatatan')
    if (data.Note !== '') {
      const tahun = rootState.index.label
      const semester = rootState.index.semester
      const halaqah = state.updateDataCatatan.Halaqah
      const result = await this.$apiSantri.$put(`update-catatan-sisalam?thn=${tahun}&smstr=${semester}&program=${program}&type=catatanpagi&sksantri=${skSantri}&halaqah=${halaqah}`, data)
      if (result) {
        result['sk'] = skSantri
        commit('setcatatanpagi', result)
        commit('btncatatan')
      }
    } else {
      const result = await this.$apiSantri.$delete(`delete-catatan-sisalam?program=${program}&type=catatanpagi&sksantri=${skSantri}`)
      if (result) {
        result['sk'] = skSantri
        commit('deletecatatanpagi', result)
        commit('btncatatan')
      }
    }
  },
  async updatecatatansore({ commit, state, rootState }, event) {
    const data = Object.fromEntries(new FormData(event.target))
    const skSantri = state.updateDataCatatan.SK.replace('#', '%23')
    const program = localStorage.getItem('program')
    commit('btncatatan')
    if (data.Note !== '') {
      const tahun = rootState.index.label
      const semester = rootState.index.semester
      const halaqah = state.updateDataCatatan.Halaqah
      const result = await this.$apiSantri.$put(`update-catatan-sisalam?thn=${tahun}&smstr=${semester}&program=${program}&type=catatansore&sksantri=${skSantri}&halaqah=${halaqah}`, data)
      if (result) {
        result['sk'] = skSantri
        commit('setcatatansore', result)
        commit('btncatatan')
      }
    } else {
      const result = await this.$apiSantri.$delete(`delete-catatan-sisalam?program=${program}&type=catatansore&sksantri=${skSantri}`)
      if (result) {
        result['sk'] = skSantri
        commit('deletecatatansore', result)
        commit('btncatatan')
      }
    }
  },

  // monitoring
  async getDataMonitoring({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const reqSettings = this.$apiBase.$get(`get-settings?sk=${program}&type=halaqah`)
    const reqAbsen = this.$apiBase.$get(`get-settings?type=session&sk=${program}`)
    const [resSettings, resAbsen] = await Promise.all([reqSettings, reqAbsen])
    commit('setMonitoring', resSettings)
    commit('setAbsen', resAbsen)
    dispatch('index/submitLoad', null, { root: true })
  },
  async getUnitMonitoring({ commit, dispatch, state }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')

    const reqSantri = await this.$apiSantri.$get(
      `get-absensi-sisalam?type=every&subject=halaqah&program=${program}&value=${state.monitoring}`
    );
    if (reqSantri) {
      commit('setSantriTahfidz', reqSantri);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
}
