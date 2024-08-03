import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(
      `get-nilai?subject=pengajar&program=${program}`
    );
    commit('setUnit', result);
  },
  async getSantri({ commit, state }, data) {
    console.log('berhasil')
    const program = localStorage.getItem('program')
    const datas = {}
    datas['Filter'] = state.selectedMapel.Jurusan
    datas['Kelas'] = state.selectedMapel.Kelas
    datas['Subject'] = state.selectedMapel.Nama
    datas['Tahun'] = this.$auth.user.Label
    datas['Semester'] = this.$auth.user.Semester
    datas['Penilaian'] = state.selectedMapel.Penilaian
    const result = await this.$apiSantri.$put(
      `get-nilai-sisalam?program=${program}`, datas
    )
    const obj = { key: 'santri', value: result.data }
    commit('setState', obj)
  },
  async setPenilaian({ commit, state }, data) {
    if (data.type === 'button') {
      commit('globalLoad')
      const skSantri = state.santri[state.openEdit.index].SK.replace('#', '%23')
      const kelas = state.santri[state.openEdit.index].Kelas
      const tahun = this.$auth.user.Label
      const semester = this.$auth.user.Semester
      try {
        // "Subject": "fiqh",
        // "SubAttribute": "uas",
        // "Fiqh": "10/30" //30 = bobot untuk uas
        const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama)
        const datas = {}
        datas['Subject'] = state.selectedMapel.Nama
        datas['SubAttribute'] = state.openEdit.key
        datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`
        const result = this.$apiSantri.$post(`input-nilai-sisalam?sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
        if (result) {
          commit('globalLoad')
        }
        commit('setPenilaian', data)
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "Perubahan tidak tersimpan",
          showConfirmButton: false,
          timer: 1500
        });
        commit('globalLoad')
      }
    } else {
      if (state.openEdit) {
        data['type'] = 'close'
        commit('globalLoad')
        const skSantri = state.santri[state.openEdit.index].SK.replace('#', '%23')
        const kelas = state.santri[state.openEdit.index].Kelas
        const tahun = this.$auth.user.Label
        const semester = this.$auth.user.Semester
        try {
          // "Subject": "fiqh",
          // "SubAttribute": "uas",
          // "Fiqh": "10/30" //30 = bobot untuk uas
          const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama)
          const datas = {}
          datas['Subject'] = state.selectedMapel.Nama
          datas['SubAttribute'] = state.openEdit.key
          datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`
          const result = this.$apiSantri.$post(`input-nilai-sisalam?sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
          if (result) {
            commit('globalLoad')
          }
          commit('setPenilaian', data)
        } catch (error) {
          Swal.fire({
            icon: "warning",
            title: "Perubahan tidak tersimpan",
            showConfirmButton: false,
            timer: 1500
          });
          // commit('globalLoad')
        }

      }
      // close
      if (data) {
        data['type'] = 'set'
        commit('setPenilaian', data)
      }
    }
  }
}

const convertToCapitalizedFormat = text => {
  const words = text.split(' ');

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  } else {
    return words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
  }
};

