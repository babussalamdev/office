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
    if (asrama !== 'off' && asrama !== '') {
      subject = 'asrama'
    } else if (kelas !== 'off' && kelas !== '') {
      subject = 'kelas'
    }
    if (subject) {
      let reqSantri = ''
      if (subject === 'asrama') {
        reqSantri = this.$apiSantri.$get(
          `get-absensi-sisalam?subject=${subject}&program=${program}&value=${asrama}`
        );
      } else {
        reqSantri = this.$apiSantri.$get(
          `get-pelanggaran-sisalam?subject=${subject}&program=smp&value=${kelas}`
        );
      }
      const reqPermissions = this.$apiBase.$get(
        `get-settings?sk=${program}&type=buttonpelanggaran&value=${jabatan}`
      )
      const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])
      commit('setSantri', { resSantri, resPermissions });
      dispatch('index/submitLoad', null, { root: true })
    } else {
      const reqSelect = await this.$apiBase.$get(
        `get-settings?type=options&sk=${program}&category=kelas`
      );
      commit('setSantri', { resSelect: reqSelect });
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  // async getPelanggaran({ commit, state }, data) {
  //   const program = localStorage.getItem('program')
  //   const jabatan = this.$auth.user.Jabatan[program]
  //   const reqSantri = this.$apiSantri.$get(
  //     `get-pelanggaran-sisalam?subject=kelas&program=${program}&value=${state.selectKelas}`
  //   );
  //   const reqPermissions = this.$apiBase.$get(
  //     `get-settings?sk=${program}&type=buttonpelanggaran&value=${jabatan}`
  //   )
  //   const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])
  //   commit('setSantriManual', { resSantri, resPermissions });
  // },
  async getPelanggaran({ commit, state }, data) {
    const program = localStorage.getItem('program');
    const jabatan = this.$auth.user.Jabatan[program];
    const reqSantri = this.$apiSantri.$get(
      `get-pelanggaran-sisalam?subject=kelas&program=${program}&value=${state.selectKelas}`
    );
    const reqPermissions = this.$apiBase.$get(
      `get-settings?sk=${program}&type=buttonpelanggaran&value=${jabatan}`
    );
    const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions]);
    commit('setSantriManual', { resSantri, resPermissions });
    // try {
    // } catch (error) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     text: "Anda tidak punya izin untuk mengakses",
    //   });
    // }
  },

  async inputForm({ commit, state }, event) {
    commit('setLoad')
    const data = Object.fromEntries(new FormData(event.target));
    data['Kelas'] = state.updateData.Kelas
    data['Asrama'] = state.updateData.Asrama
    const skSantri = state.updateData.SK.replace('#', '%23')
    const program = localStorage.getItem("program");
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    try {
      const result = await this.$apiSantri.$post(
        `input-pelanggaran-sisalam?program=${program}&sksantri=${skSantri}&thn=${tahun}&smstr=${semester}`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        result["key"] = state.updateData.SK;
        commit("updatePelanggaran", result);
        commit('setLoad')
      }
    } catch (error) {
      commit('setLoad')
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    }
  },
  async getRecord({ dispatch, commit }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const skSantri = data.replace('#', '%23')
    const tahun = this.$auth.user.Label
    const result = await this.$apiSantri.$get(`get-pelanggaran-sisalam?program=${program}&sksantri=${skSantri}&tahun=${tahun}`)
    if (result) {
      commit('setRecord', result)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async updateForm({ commit, state }, value) {
    commit('setLoad')
    const data = Object.fromEntries(new FormData(value.event.target));
    const program = localStorage.getItem('program')
    const key = {
      PK: `${value.id}#pelanggaran`,
      SK: state.updateRecord.SK
    }
    const datas = {
      program, key, data
    }
    try {
      const result = await this.$apiSantri.$put(`update-pelanggaran-sisalam?type=update`, datas);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        result["key"] = state.updateRecord.SK;
        commit("updateRecordPelanggaran", result);
        commit('setLoad')
      }
    } catch (error) {
      console.log(error);
      commit('setLoad')
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    }
  },
  async deleteItem({ commit, state }, data) {
    const i = state.record.findIndex((x) => x.SK === data.sk)
    const name = state.record[i].Nama
    const result = await Swal.fire({
      title: name,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const program = localStorage.getItem('program')
      const key = {
        PK: `${data.id}#pelanggaran`,
        SK: data.sk
      }
      const datas = {
        program, key
      }
      await this.$apiSantri.$put(
        `update-pelanggaran-sisalam?type=delete`, datas
      );
      commit('deleteRecord', data.sk);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
}
