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

    const result = await this.$apiSantri.$get(
      `get-pelanggaran-sisalam?subject=${subject}&program=${program}&jabatan=${jabatan}&asrama=${asrama}&kelas=${kelas}`
    );

    result['select'] = []

    commit('setData', result);
  },
  async getAbsensi({ commit }, data) {
    const program = localStorage.getItem('program')
    const jabatan = this.$auth.user.Jabatan[program]
    const result = await this.$axios.$get(
      `get-absensi?subject=kelas&program=${program}&kelas=${data}&absen=asrama&name=${jabatan}`
    );

    commit('setSantriAsrama', result);
  },
  async getRecord({ commit }, data) {
    const result = await this.$axios.$get(`get-pelanggaran?code=${data.code}&key=${data.key}`)
    commit('setRecord', result)
  }
}
