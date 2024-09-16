export default {
  setUnit({ commit, state, dispatch, rootState }, datas) {
    localStorage.setItem("program", state.unit);
    if (state.unit === "root") {
      commit("index/root", null, { root: true });
    } else {
      dispatch("index/changeUnit", state.unit, { root: true });
    }
    const name = datas.route
    alert(name)
    if (name === "index") {
      dispatch(`home/setMainChart`, state.unit, { root: true });
    } else if (name === "settings-mapel") {
      if ( rootState.index.permissions.includes('setup mapel') ) {
        dispatch(`mapel/changeUnit`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-asrama") {
      if ( rootState.index.permissions.includes('setup asrama') ) {
        dispatch(`kelompok/changeUnitAsrama`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-kelas") {
      if ( rootState.index.permissions.includes('setup kelas') ) {
        dispatch(`kelas/changeUnit`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-periode") {
      dispatch(`periode/changeUnit`, state.unit, { root: true });
    } else if (name === "settings-kelompok") {
      dispatch(`kelompok/changeUnit`, state.unit, { root: true });
    } else if (name === "settings-kaldiksetup" || name === "kaldik") {
      dispatch(`kaldik/changeUnit`, state.unit, { root: true });
    } else if (name === "settings-setupabsensi") {
      dispatch(`setupabsensi/getAbsensi`, state.unit, { root: true });
    } else if (name === "settings-nilaiquran") {
      if ( rootState.index.permissions.includes('setup nilai quran') ) {
        dispatch(`setupnilaiquran/changeUnit`, null, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-halaqah") {
      if ( rootState.index.permissions.includes('setup halaqah') ) {
        dispatch(`kelompok/changeUnitHalaqah`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "santri-database") {
      if ( rootState.index.permissions.includes('data santri') ) {
        dispatch(`santri/database/changeUnit`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "pegawai-database") {
      dispatch(`pegawai/database/changeUnit`, state.unit, { root: true });
    } else if (name === 'settings-kelas') {
      dispatch('kelas/changeUnit', state.unit, { root: true })
    } else if (name === 'settings-absensi') {
      if ( rootState.index.permissions.includes('setup absensi') ) {
        dispatch('setupabsensi/getAbsensi', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'settings-struktur') {
      dispatch('struktur/changeUnit', state.unit, { root: true })
    } else if (name === 'pengampu') {
      if ( rootState.index.permissions.includes('absensi pengampu') ) {
        dispatch('pengampu/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'ekskull-nilai') {
      dispatch('ekskull/nilai/changeUnit', null, { root: true })
    } else if (name === 'asrama-absensi') {
      dispatch('asramaAbsensi/changeUnit', null, { root: true })
    } else if (name === 'tahfidz-absensi') {
      dispatch('tahfidzAbsensi/changeUnit', null, { root: true })
    } else if (name === 'tahfidz-mutabaah') {
      dispatch('mutabaah/changeUnit', null, { root: true })
    } else if (name === 'tahfidz-nilai') {
      dispatch('tahfidznilai/changeUnit', null, { root: true })
    } else if (name === 'tahfidz-rekap-absensi') {
      dispatch('rekap/changeUnit', null, { root: true })
    } else if (name === 'tahfidz-rekap-hafalan') {
      dispatch('rekaphafalan/changeUnit', null, { root: true })
    } else if (name === 'pelanggaran') {
      dispatch('pelanggaran/changeUnit', null, { root: true })
    } else if (name === 'report-mapel') {
      if ( rootState.index.permissions.includes('report mapel') ) {
        dispatch('report/nilaimapel/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'report-tahfidz-absensi') {
      dispatch('report/tahfidz/absensi/changeUnit', null, { root: true })
    } else if (name === 'report-tahfidz-hafalan') {
      dispatch('report/tahfidz/hafalan/changeUnit', null, { root: true })
    } else if (name === 'report-tahfidz-nilai') {
      dispatch('report/tahfidz/nilai/changeUnit', null, { root: true })
    } else if (name === 'report-pengampu') {
      if ( rootState.index.permissions.includes('report pengampu') ) {
        dispatch('report/pengampu/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'report-absensi') {
      if ( rootState.index.permissions.includes('report absensi') ) {
        dispatch('report/absensi/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'report-jurnal') {
      if ( rootState.index.permissions.includes('report jurnal') ) {
        dispatch('report/jurnal/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'settings-pelanggaran') {
      if ( rootState.index.permissions.includes('setup pelanggaran') ) {
        dispatch('setuppelanggaran/getPelanggaran', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-kelas') {
      if ( rootState.index.permissions.includes('kelas') ) {
        dispatch('santri/kelas/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-asrama') {
      if ( rootState.index.permissions.includes('asrama') ) {
        dispatch('santri/asrama/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-halaqah') {
      if ( rootState.index.permissions.includes('halaqah') ) {
        dispatch('santri/halaqah/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-ekskull') {
      if ( rootState.index.permissions.includes('ekskull') ) {
        dispatch('santri/ekskull/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-halaqah') {
      if ( rootState.index.permissions.includes('pengampu') ) {
        dispatch('pegawai/halaqah/changeUnit', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-walas') {
      if ( rootState.index.permissions.includes('wali kelas') ) {
        dispatch('pegawai/walas/showWalas', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-musyrif') {
      if ( rootState.index.permissions.includes('musyrif') ) {
        dispatch('pegawai/musyrif/showMusyrif', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-mapel') {
      if ( rootState.index.permissions.includes('pengajar') ) {
        dispatch('pegawai/mapel/changeUnit', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    }
  },
}
