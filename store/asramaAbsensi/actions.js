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
          `get-absensi-sisalam?subject=${subject}&program=${program}&value=${kelas}`
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
  async getAbsensi({ commit }) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const reqSantri = this.$apiSantri.$get(
      `get-absensi-sisalam?subject=kelas&program=${program}&value=${state.selectKelas}`
    );
    const reqPermissions = this.$apiBase.$get(
      `get-settings?sk=${program}&type=buttonAbsensi&value=${jabatan}`
    )
    const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])
    commit('setSantriAsramaManual', { resSantri, resPermissions });
  },
  async santriAbsen({ commit, state}, event) {
    commit('setLoad')
    const data = Object.fromEntries(new FormData(event.target));
    console.log(data)
    data["Status"] = state.updateData.type;
    const skSantri = state.updateData.santri.SK.replace('#', '%23')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const program = localStorage.getItem("program");
    try {
      const result = await this.$apiSantri.$put(
        `update-absensi-sisalam?sksantri=${skSantri}&type=asrama&thn=${tahun}&smstr=${semester}&program=${program}`,
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
        commit("asramaAbsensi/updateAbsen", result);
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
}
