import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(
      `get-mapel?subject=pengajar&program=${program}`
    );
    if ( result ) {
      commit('setUnit', result);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state }, data) {
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
  async setPenilaian({ commit, state, dispatch }, data) {
    if (data.type === 'button') {
      dispatch('index/submitLoad', null, { root: true })
      const skSantri = state.santri[state.openEdit.index].SK.replace('#', '%23')
      const kelas = state.santri[state.openEdit.index].Kelas
      const tahun = this.$auth.user.Label
      const semester = this.$auth.user.Semester
      try {
        const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama)
        const datas = {}
        datas['Subject'] = state.selectedMapel.Nama
        datas['SubAttribute'] = state.openEdit.key
        datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`
        const result = await this.$apiSantri.$post(`input-nilai-sisalam?type=nilaimapel&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
        if (result) {
          dispatch('index/submitLoad', null, { root: true })
          data['result'] = result
          commit('setPenilaian', data)
        }
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "Perubahan tidak tersimpan",
          showConfirmButton: false,
          timer: 1500
        });
        dispatch('index/submitLoad', null, { root: true })
      }
    } else {
      if (state.openEdit) {
        dispatch('index/submitLoad', null, { root: true })
        data['type'] = 'close'
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
          const result = await this.$apiSantri.$post(`input-nilai-sisalam?type=nilaimapel&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
          if (result) {
            data['result'] = result
            dispatch('index/submitLoad', null, { root: true })
            commit('setPenilaian', data)
          }
        } catch (error) {
          dispatch('index/submitLoad', null, { root: true })
          Swal.fire({
            icon: "warning",
            title: "Perubahan tidak tersimpan",
            showConfirmButton: false,
            timer: 1500
          });
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

