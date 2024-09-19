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
          `get-absensi-sisalam?type=every&subject=${subject}&program=${program}&value=${asrama}`
        );
      } else {
        reqSantri = this.$apiSantri.$get(
          `get-absensi-sisalam?type=every&subject=${subject}&program=${program}&value=${kelas}`
        );
      }
      const reqPermissions = this.$apiBase.$get(
        `get-settings?sk=${program}&type=buttonAbsensi&value=${jabatan}`
      )
      const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])
      commit('setSantriAsrama', { resSantri, resPermissions });
      dispatch('index/submitLoad', null, { root: true })
    } else {
      const reqSelect = await this.$apiBase.$get(
        `get-settings?type=options&sk=${program}&category=kelas`
      );
      commit('setSantriAsrama', { resSelect: reqSelect });
      dispatch('index/submitLoad', null, { root: true })
    }

    // const result = await this.$apiSantri.$get(
    //   `get-absensi?subject=${subject}&program=${program}&jabatan=${jabatan}&asrama=${asrama}&halaqah=${halaqah}&kelas=${kelas}&absen=asrama`
    // );
  },
  async getAbsensi({ commit, state }) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const reqSantri = this.$apiSantri.$get(
      `get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${state.selectKelas}`
    );
    const reqPermissions = this.$apiBase.$get(
      `get-settings?sk=${program}&type=buttonAbsensi&value=${jabatan}`
    )
    const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])
    commit('setSantriAsramaManual', { resSantri, resPermissions });
  },
  async santriAbsen({ commit, state }, event) {
    commit('setLoad')
    const data = Object.fromEntries(new FormData(event.target));
    data["Status"] = state.updateData.type;
    const skSantri = state.updateData.santri.SK.replace('#', '%23')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const subject = state.updateData.santri.Asrama
    const program = localStorage.getItem("program");
    try {
      let result
      if (state.updateData.type === 'izin') {
        result = await this.$apiSantri.$put(
          `update-absensi-sisalam?sksantri=${skSantri}&type=asrama&thn=${tahun}&smstr=${semester}&program=${program}&date=${state.dateIzin}&subject=${subject}`,
          data
        );
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        if (state.dateIzin === formattedDate) {
          commit('setLoad')
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate",
            showConfirmButton: false,
            timer: 1500,
          });
          result["SK"] = state.updateData.santri.SK;
          commit("updateAbsen", result);
          commit('setState', { key: 'dateIzin', value: '' })
        } else {
          commit('setLoad')
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Berhasil masuk ke antrian",
          })
          const today = new Date()
          const formattedDate = today.toISOString().split('T')[0]
          commit("updateAbsenSantri", result);
          commit('setState', { key: 'dateIzin', value: formattedDate })
        }
      } else {
        console.log('bukan izin')
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        result = await this.$apiSantri.$put(
          `update-absensi-sisalam?sksantri=${skSantri}&type=asrama&thn=${tahun}&smstr=${semester}&program=${program}&subject=${subject}&date=${formattedDate}`,
          data
        );
        if (result) {
          commit('setLoad')
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate",
            showConfirmButton: false,
            timer: 1500,
          });
          result["SK"] = state.updateData.santri.SK;
          commit("updateAbsen", result);
        }
      }

    } catch (error) {
      console.log(error);
      commit('setLoad')
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  // list izin
  async changeUnitSecond({ commit, state, dispatch }) {
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiSantri.$get(`get-logs?type=antrian&program=${program}`)
      commit('setState', { key: 'santriIzin', value: result })
    } catch (error) {

    }
  },
  async deleteItem({ commit, state, dispatch }, sk) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const skList = sk.replace(/#/g, '%23')
      const result = await this.$apiSantri.$delete(`delete-logs?type=antrian&sk=${skList}`)
      if (result) {
        commit('deleteIzin', sk)
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
}
