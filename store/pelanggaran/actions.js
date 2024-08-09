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
  async getPelanggaran({ commit, state }, data) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const reqSantri = this.$apiSantri.$get(
      `get-pelanggaran-sisalam?subject=kelas&program=${program}&value=${state.selectKelas}`
    );
    const reqPermissions = this.$apiBase.$get(
      `get-settings?sk=${program}&type=buttonpelanggaran&value=${jabatan}`
    )
    const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])
    commit('setSantriManual', { resSantri, resPermissions });
  },
  async inputForm({ commit, state}, event) {
    // this.btn = false;
    const data = Object.fromEntries(new FormData(event.target));
    console.log(data)
    const skSantri = state.updateData.SK.replace('#', '%23')
    const program = localStorage.getItem("program");
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    try {
      const result = await this.$apiSantri.$post(
        `input-pelanggaran-sisalam?program=${program}&sksantri=${skSantri}&thn=${tahun}&smstr=${semester}`,
        data
      );
      console.log(result)
      if (result) {
        // this.btn = true;
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        // result["key"] = this.updateData.SK;
        // this.$store.commit("pelanggaran/updatePelanggaran", result);
        // this.$refs.inputForm.reset();
        // this.asramaShow = "";
        // this.$emit("resetSelect");
        // $("#inputModal").modal("hide");
      }
    } catch (error) {
      // this.btn = true;
      console.log(error);
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    }
  },
  async getRecord({ commit }, data) {
    const result = await this.$axios.$get(`get-pelanggaran?code=${data.code}&key=${data.key}`)
    commit('setRecord', result)
  },

}
