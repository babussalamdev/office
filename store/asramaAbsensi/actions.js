export default {
  async changeUnit({ commit }, data) {
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

    // const result = await this.$apiSantri.$get(
    //   `get-absensi?subject=${subject}&program=${program}&jabatan=${jabatan}&asrama=${asrama}&halaqah=${halaqah}&kelas=${kelas}&absen=asrama`
    // );
    const reqSantri = this.$apiSantri.$get(
      `get-absensi?subject=${subject}&program=${program}&value=${asrama}`
    );
    const reqPermissions = this.$apiBase.$get(
      `get-settings?sk=${program}&type=buttonAbsensi&value=${jabatan}`
    )
    const [resSantri, resPermissions] = await Promise.all([reqSantri, reqPermissions])

    // result['select'] = []

    commit('setSantriAsrama', { resSantri, resPermissions});
  },
  async getAbsensi({ commit }, data) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const result = await this.$axios.$get(
      `get-absensi?subject=kelas&program=${program}&kelas=${data}&absen=asrama&name=${jabatan}`
    );

    commit('setSantriAsrama', result);
  }
}
