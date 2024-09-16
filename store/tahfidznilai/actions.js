import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const halaqah = this.$auth.user.Halaqah[program]
    const semester = this.$auth.user.Semester
    try {
      const data = await this.$axios.$get(`get-settings?program=${program}&type=nilaiquran&hlq=${halaqah}&smstr=${semester}`)
      commit('setState', { key: 'selectedQuran', value: data.quran })
      if (data.quran) {
        const datas = {}
        datas['Filter'] = 'pengampu'
        datas['Halaqah'] = this.$auth.user.Halaqah[program]
        datas['Subject'] = 'quran'
        datas['Tahun'] = this.$auth.user.Label
        datas['Semester'] = this.$auth.user.Semester
        datas['Penilaian'] = state.selectedQuran.Penilaian
        const result = await this.$apiSantri.$put(
          `get-nilai-sisalam?program=${program}&type=pengampu`, datas
        )
        if (result) {
          commit('setState', { key: 'santri', value: result.data })
          dispatch('index/submitLoad', null, { root: true })

          const newData = state.selectedQuran.Penilaian || {};
          const newHeaders = { Nama: '' };

          for (const [key, value] of Object.entries(newData)) {
            newHeaders[key] = value;
          }

          if (state.th.hasOwnProperty('Total')) {
            newHeaders['Total'] = state.th['Total'];
          }

          commit('setState', { key: 'th', value: newHeaders });
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: "Penilaian untuk Quran belum di setup",
        });
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        title: 'Warning!',
        text: 'Penilaian Tahfidz belum di setup',
        icon: 'warning',
      });
    }
  },
  // async changeUnit({ commit, dispatch }, data) {
  //   dispatch('index/submitLoad', null, { root: true })
  //   const program = localStorage.getItem('program')
  //   const result = await this.$apiBase.$get(
  //     `get-mapel?subject=pengajar&program=${program}`
  //   );
  //   if ( result ) {
  //     commit('setUnit', result);
  //     dispatch('index/submitLoad', null, { root: true })
  //   }
  // },
  // async getSantri({ commit, state }, data) {
  //   const program = localStorage.getItem('program')
  //   const datas = {}
  //   datas['Filter'] = state.selectedMapel.Jurusan
  //   datas['Kelas'] = state.selectedMapel.Kelas
  //   datas['Subject'] = state.selectedMapel.Nama
  //   datas['Tahun'] = this.$auth.user.Label
  //   datas['Semester'] = this.$auth.user.Semester
  //   datas['Penilaian'] = state.selectedMapel.Penilaian
  //   const result = await this.$apiSantri.$put(
  //     `get-nilai-sisalam?program=${program}`, datas
  //   )
  //   const obj = { key: 'santri', value: result.data }
  //   commit('setState', obj)
  // },
  async setPenilaian({ commit, state, dispatch }, data) {
    const program = localStorage.getItem('program')
    if (data.type === 'button') {
      dispatch('index/submitLoad', null, { root: true })
      const skSantri = state.santri[state.openEdit.index].SK.replace('#', '%23')
      const kelas = state.santri[state.openEdit.index].Kelas
      const tahun = this.$auth.user.Label
      const semester = this.$auth.user.Semester
      try {
        const Key = 'Quran'
        const datas = {}
        datas['Subject'] = Key
        datas['SubAttribute'] = state.openEdit.key
        datas[Key] = `${state.nilai}/${state.selectedQuran.Penilaian[state.openEdit.key]}`
        if (state.nilai > 100) {
          Swal.fire({
            title: 'Warning!',
            text: 'Nilai tidak boleh lebih dari 100.',
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000
          });
          dispatch('index/submitLoad', null, { root: true })
        } else {
          const result = await this.$apiSantri.$post(`input-nilai-sisalam?type=nilaiquran&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
          if (result) {
            dispatch('index/submitLoad', null, { root: true })
            data['result'] = result
            commit('setPenilaian', data)
          }
        }
      } catch (error) {
        console.log(error)
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
          const Key = 'Quran'
          const datas = {}
          datas['Subject'] = Key
          datas['SubAttribute'] = state.openEdit.key
          datas[Key] = `${state.nilai}/${state.selectedQuran.Penilaian[state.openEdit.key]}`
          if (state.nilai > 100) {
            Swal.fire({
              title: 'Warning!',
              text: 'Nilai tidak boleh lebih dari 100.',
              icon: 'warning',
              timer: 3000,
              showConfirmButton: false
            });
            dispatch('index/submitLoad', null, { root: true })
          } else {
            const result = await this.$apiSantri.$post(`input-nilai-sisalam?type=nilaiquran&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
            if (result) {
              dispatch('index/submitLoad', null, { root: true })
              data['result'] = result
              commit('setPenilaian', data)
            }
          }
        } catch (error) {
          console.log(error)
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
        console.log(data)
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

