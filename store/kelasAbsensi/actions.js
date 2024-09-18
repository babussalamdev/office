import Swal from "sweetalert2"

export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const resSelect = await this.$apiBase.$get(
      `get-settings?type=absensikelas`
    )
    if ( resSelect.length > 0 ) {
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
  async getDataSantri({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$apiSantri.$get(
      `get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${data}`
    );

    commit('setDataSantri', result);
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
    console.log(obj)
  },
  async deleteStatus({ commit, state, dispatch }, datas) {
    dispatch('index/submitLoad', null, { root: true })
    const i = state.santri.findIndex((x) => x.SK === datas.sk)
    const data = state.santri[i]
    const time = datas.time
    let sk = ''
    if (time === 'mapelSatu') {
      sk = data.Logs.mapelsatutime
    } else if (time === 'mapelDua') {
      sk = data.Logs.mapelduatime
    } else {
      sk = data.Logs.mapeltigatime
    }
    const skSantri = datas.sk.replace('#', '%23')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const program = localStorage.getItem("program");
    const req = await this.$apiSantri.$delete(
      `delete-absensi-sisalam?sksantri=${skSantri}&type=${time}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${skSantri}&status=${datas.condition}`
    );
    req['time'] = time
    req["SK"] = datas.sk;
    commit('deleteAbsen', req);
    dispatch('index/submitLoad', null, { root: true })
  },
}
