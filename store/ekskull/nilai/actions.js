import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(
      `get-settings?type=options&sk=${program}&category=ekskull`
    );
    if (result) {
      commit('setState', { key: 'select', value: result })
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const methode = state.selectedEkskull
    const result = await this.$apiSantri.$get(
      `get-logs?thn=${tahun}&smstr=${semester}&methode=${methode}&program=${program}`
    )
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async setPenilaian({ commit, state, dispatch }, data) {
    // close
    if (data.type === 'button') {
      dispatch('index/submitLoad', null, { root: true })
      const skSantri = state.santri[state.openEdit.index].SKsantri.replace('#', '%23')
      const kelas = state.santri[state.openEdit.index].Kelas
      const skLogs = state.santri[state.openEdit.index].SKlogs.replace(/#/g, '%23')
      const tahun = this.$auth.user.Label
      const semester = this.$auth.user.Semester
      const nilai = { Nilai: +state.nilai }
      try {
        const result = await this.$apiSantri.$put(`update-logs?methode=${state.selectedEkskull}&sksantri=${skSantri}&thn=${tahun}&kls=${kelas}&smstr=${semester}&sklogs=${skLogs}`, nilai)
        data['result'] = result
        commit('setPenilaian', data)
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "Perubahan tidak tersimpan",
          showConfirmButton: false,
          timer: 1500
        });
      }
      dispatch('index/submitLoad', null, { root: true })
    } else {
      if (state.openEdit) {
        data['type'] = 'close'
        dispatch('index/submitLoad', null, { root: true })
        const skSantri = state.santri[state.openEdit.index].SKsantri.replace('#', '%23')
        const kelas = state.santri[state.openEdit.index].Kelas
        const skLogs = state.santri[state.openEdit.index].SKlogs.replace(/#/g, '%23')
        const tahun = this.$auth.user.Label
        const semester = this.$auth.user.Semester
        const nilai = { Nilai: +state.nilai }
        try {
          const result = await this.$apiSantri.$put(`update-logs?methode=${state.selectedEkskull}&sksantri=${skSantri}&thn=${tahun}&kls=${kelas}&smstr=${semester}&sklogs=${skLogs}`, nilai)
          data['result'] = result
          commit('setPenilaian', data)
        } catch (error) {
          Swal.fire({
            icon: "warning",
            title: "Perubahan tidak tersimpan",
            showConfirmButton: false,
            timer: 1500
          });
        }
        dispatch('index/submitLoad', null, { root: true })
      }
    }
    if (data) {
      data['type'] = 'set'
      commit('setPenilaian', data)
    }
  },
  // async setPenilaian({ commit, state, dispatch }, data) {
  //   if (data.type === 'button') {
  //     dispatch('index/submitLoad', null, { root: true })
  //     const skSantri = state.santri[state.openEdit.index].SK.replace('#', '%23')
  //     const kelas = state.santri[state.openEdit.index].Kelas
  //     const tahun = this.$auth.user.Label
  //     const semester = this.$auth.user.Semester
  //     try {
  //       const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama)
  //       const datas = {}
  //       datas['Subject'] = state.selectedMapel.Nama
  //       datas['SubAttribute'] = state.openEdit.key
  //       datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`
  //       const result = await this.$apiSantri.$post(`input-nilai-sisalam?sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
  //       if (result) {
  //         dispatch('index/submitLoad', null, { root: true })
  //         data['result'] = result
  //         commit('setPenilaian', data)
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Perubahan tidak tersimpan",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       dispatch('index/submitLoad', null, { root: true })
  //     }
  //   } else {
  //     if (state.openEdit) {
  //       dispatch('index/submitLoad', null, { root: true })
  //       data['type'] = 'close'
  //       const skSantri = state.santri[state.openEdit.index].SK.replace('#', '%23')
  //       const kelas = state.santri[state.openEdit.index].Kelas
  //       const tahun = this.$auth.user.Label
  //       const semester = this.$auth.user.Semester
  //       try {
  //         // "Subject": "fiqh",
  //         // "SubAttribute": "uas",
  //         // "Fiqh": "10/30" //30 = bobot untuk uas
  //         const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama)
  //         const datas = {}
  //         datas['Subject'] = state.selectedMapel.Nama
  //         datas['SubAttribute'] = state.openEdit.key
  //         datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`
  //         const result = await this.$apiSantri.$post(`input-nilai-sisalam?sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`, datas)
  //         if (result) {
  //           data['result'] = result
  //           dispatch('index/submitLoad', null, { root: true })
  //           commit('setPenilaian', data)
  //         }
  //       } catch (error) {
  //         dispatch('index/submitLoad', null, { root: true })
  //         Swal.fire({
  //           icon: "warning",
  //           title: "Perubahan tidak tersimpan",
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //       }

  //     }
  //     // close
  //     if (data) {
  //       data['type'] = 'set'
  //       commit('setPenilaian', data)
  //     }
  //   }
  // }
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

