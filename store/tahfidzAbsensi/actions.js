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
    const reqSantri = await this.$apiSantri.$get(
      `get-absensi-sisalam?type=all&subject=halaqah&program=${program}&value=${halaqah}`
    );
    if ( reqSantri ) {
      commit('setSantriTahfidz', reqSantri);
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
  async deleteStatus({ commit, state, dispatch }, datas) {
    dispatch('index/submitLoad', null, { root: true })
    const i = state.santri.findIndex((x) => x.SK === datas.sk)
    const data = state.santri[i]
    const time = datas.time
    const sk = data[time].time
    const skSantri = datas.sk.replace('#', '%23')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const program = localStorage.getItem("program");
    const req = await this.$apiSantri.$delete(
      `delete-absensi-sisalam?sksantri=${skSantri}&type=halaqah${time}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${sk}&status=${datas.condition}`
    );
    if ( req ) {
      req['time'] = time
      req["SK"] = datas.sk;
      commit('deleteAbsen', req);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
}
