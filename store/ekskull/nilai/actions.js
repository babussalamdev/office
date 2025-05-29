import * as XLSX from "xlsx";
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
  async getSantri({ commit, state, dispatch, rootState }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = rootState.index.label
    const semester = rootState.index.semester
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
  async setPenilaian({ commit, state, dispatch, rootState }, data) {
    // close
    if (data.type === 'button') {
      dispatch('index/submitLoad', null, { root: true })
      const skSantri = state.santri[state.openEdit.index].SKsantri.replace('#', '%23')
      const kelas = state.santri[state.openEdit.index].Kelas
      const skLogs = state.santri[state.openEdit.index].SKlogs.replace(/#/g, '%23')
      const tahun = rootState.index.label
      const semester = rootState.index.semester
      const nilai = { Nilai: +state.nilai }
      try {
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
          const result = await this.$apiSantri.$put(`update-logs?methode=${state.selectedEkskull}&sksantri=${skSantri}&thn=${tahun}&kls=${kelas}&smstr=${semester}&sklogs=${skLogs}`, nilai)
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
      if (state.openEdit && state.nilai) {
        data['type'] = 'close'
        dispatch('index/submitLoad', null, { root: true })
        const skSantri = state.santri[state.openEdit.index].SKsantri.replace('#', '%23')
        const kelas = state.santri[state.openEdit.index].Kelas
        const skLogs = state.santri[state.openEdit.index].SKlogs.replace(/#/g, '%23')
        const tahun = rootState.index.label
        const semester = rootState.index.semester
        const nilai = { Nilai: +state.nilai }
        try {
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
            const result = await this.$apiSantri.$put(`update-logs?methode=${state.selectedEkskull}&sksantri=${skSantri}&thn=${tahun}&kls=${kelas}&smstr=${semester}&sklogs=${skLogs}`, nilai)
            data['result'] = result
            commit('setPenilaian', data)
            dispatch('index/submitLoad', null, { root: true })
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
    }
    if (data) {
      data['type'] = 'set'
      if (!state.nilai && state.openEdit) {
        Swal.fire({
          title: 'Warning!',
          text: 'Nilai tidak boleh kosong!',
          icon: 'warning',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        commit('setPenilaian', data)
      }
    }
  },
  async exportToExcel({ rootState, commit, dispatch, state }) {
    commit('btn')
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    try {
      const res = await this.$apiSantri.$get(`get-logs?thn=${tahun}&program=${program}&smstr=${semester}&methodexlsx=${state.selectedEkskull}`)
      const base64WithPrefix = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64data}`
      const byteString = atob(base64WithPrefix.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const wb = XLSX.read(ab, { type: 'array' });
      XLSX.writeFile(wb, `${res.fileName}`)
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      dispatch('index/submitLoad', null, { root: true })
      commit('btn')
    }
  },
}

const convertToCapitalizedFormat = text => {
  const words = text.split(' ');

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  } else {
    return words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('_');
  }
};

