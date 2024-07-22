export default {
  async changeUnit({ commit }, data) {
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
    if(subject) {
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
      commit('setSantriAsrama', { resSantri, resPermissions});
    } else {
      const reqSelect = await this.$apiBase.$get(
        `get-settings?type=options&sk=${program}&category=kelas`
      );
      commit('setSantriAsrama', { resSelect: reqSelect });
    }

    // const result = await this.$apiSantri.$get(
      //   `get-absensi?subject=${subject}&program=${program}&jabatan=${jabatan}&asrama=${asrama}&halaqah=${halaqah}&kelas=${kelas}&absen=asrama`
      // );
    },
    async getAbsensi({ commit }, data) {
      const program = localStorage.getItem('program')
      const jabatan = this.$auth.user.Jabatan[program]
      const reqSantri = this.$apiSantri.$get(
        `get-absensi-sisalam?subject=kelas&program=${program}&value=${data}`
      );
      const reqPermissions = this.$apiBase.$get(
        `get-settings?sk=${program}&type=buttonAbsensi&value=${jabatan}`
      )
      const [resSantri, resPermissions ] = await Promise.all([reqSantri, reqPermissions])
    commit('setSantriAsramaManual', { resSantri, resPermissions });
  }
}
