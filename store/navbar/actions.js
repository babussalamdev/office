export default {
  async setUnit({ commit, state, dispatch, rootState }, datas) {
    localStorage.setItem("program", state.unit);
    if (state.unit === "root") {
      commit("index/root", null, { root: true });
    } else {
      await dispatch("index/changeUnit", state.unit, { root: true });
    }
    const permissions = rootState.index.permissions[0] !== 'none' ? rootState.index.permissions : [];
    const name = datas.route
    if (name === "index") {
      dispatch(`home/setMainChart`, state.unit, { root: true });
    } else if (name === "settings-mapel") {
      if (permissions.includes('setup mapel')) {
        dispatch(`mapel/changeUnit`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-asrama") {
      if (permissions.includes('setup asrama')) {
        dispatch(`kelompok/changeUnitAsrama`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-kelas") {
      if (permissions.includes('setup kelas')) {
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
      if (permissions.includes('setup nilai quran')) {
        dispatch(`setupnilaiquran/changeUnit`, null, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "settings-halaqah") {
      if (permissions.includes('setup halaqah')) {
        dispatch(`kelompok/changeUnitHalaqah`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "santri-database") {
      if (permissions.includes('data santri')) {
        dispatch(`santri/database/changeUnit`, state.unit, { root: true });
      } else {
        this.$router.push('/')
      }
    } else if (name === "pegawai-database") {
      dispatch(`pegawai/database/changeUnit`, state.unit, { root: true });
    } else if (name === 'settings-kelas') {
      dispatch('kelas/changeUnit', state.unit, { root: true })
    } else if (name === 'settings-absensi') {
      if (permissions.includes('setup absensi')) {
        dispatch('setupabsensi/getAbsensi', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'settings-struktur') {
      dispatch('struktur/changeUnit', state.unit, { root: true })
    } else if (name === 'pengampu') {
      if (permissions.includes('absensi pengampu')) {
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
      if (permissions.includes('report mapel')) {
        dispatch('report/nilaimapel/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'report-lagger') {
      if (permissions.includes('report mapel')) {
        dispatch('report/lagger/changeUnit', null, { root: true })
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
      if (permissions.includes('report pengampu')) {
        dispatch('report/pengampu/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'report-absensi') {
      if (permissions.includes('report absensi')) {
        dispatch('report/absensi/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'report-jurnal') {
      if (permissions.includes('report jurnal')) {
        dispatch('report/jurnal/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'settings-pelanggaran') {
      if (permissions.includes('setup pelanggaran')) {
        dispatch('setuppelanggaran/getPelanggaran', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-kelas') {
      if (permissions.includes('kelas')) {
        dispatch('santri/kelas/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-asrama') {
      if (permissions.includes('asrama')) {
        dispatch('santri/asrama/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-halaqah') {
      if (permissions.includes('halaqah')) {
        dispatch('santri/halaqah/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'santri-ekskull') {
      if (permissions.includes('ekskull')) {
        dispatch('santri/ekskull/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-halaqah') {
      if (permissions.includes('pengampu')) {
        dispatch('pegawai/halaqah/changeUnit', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-walas') {
      if (permissions.includes('wali kelas')) {
        dispatch('pegawai/walas/showWalas', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-musyrif') {
      if (permissions.includes('musyrif')) {
        dispatch('pegawai/musyrif/showMusyrif', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'pegawai-mapel') {
      if (permissions.includes('pengajar')) {
        dispatch('pegawai/mapel/changeUnit', state.unit, { root: true })
      } else {
        this.$router.push('/')
      }
    } else if (name === 'kelas-absensi') {
      if (permissions.includes('pengajar')) {
        dispatch('kelasAbsensi/changeUnit', null, { root: true })
      } else {
        this.$router.push('/')
      }
    }
  },
}
