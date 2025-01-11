import Swal from "sweetalert2"

export default {
  async changeUnit({ commit, dispatch, state }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
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
  async getDataSantri({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiSantri.$get(
      `get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${data}`
    );

    commit('setDataSantri', result);
    dispatch('index/submitLoad', null, { root: true })
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

  async santriAbsen({ commit, state, rootState}, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Status"] = state.updateData.type;
    data['Mapel'] = state.updateData.mapel
    const skSantri = state.updateData.santri.SK.replace('#', '%23')
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const time = state.updateData.time
    const namakelas = state.updateData.santri.Kelas
    const program = localStorage.getItem("program");
    try {
      const result = await this.$apiSantri.$put(
        `update-absensi-sisalam?sksantri=${skSantri}&type=${time}&thn=${tahun}&smstr=${semester}&program=${program}&subject=${namakelas}`,
        data
      );
      if (result) {
        commit('btn')
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diupdate",
          showConfirmButton: false,
          timer: 1500,
        });
        result['time'] = time
        result["SK"] = state.updateData.santri.SK;
        commit('updateAbsen', result);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
      commit('btn')
    }
  },

  async deleteStatus({ commit, state, dispatch, rootState }, datas) {
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
    const tahun = rootState.index.label
    const semester = rootState.index.semester
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
