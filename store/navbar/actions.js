export default {
  setUnit({ commit, state, dispatch }, datas) {
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
    } else if (name === "setting-mapel") {
      dispatch(`mapel/changeUnit`, state.unit, { root: true });
    } else if (name === "setting-kelas") {
      dispatch(`kelas/changeUnit`, state.unit, { root: true });
    } else if (name === "setting-periode") {
      dispatch(`periode/changeUnit`, state.unit, { root: true });
    } else if (name === "setting-kelompok") {
      dispatch(`kelompok/changeUnit`, state.unit, { root: true });
    } else if (name === "setting-kaldiksetup" || name === "kaldik") {
      dispatch(`kaldik/changeUnit`, state.unit, { root: true });
    } else if (name === "setting-setupabsensi") {
      dispatch(`setupabsensi/getAbsensi`, state.unit, { root: true });
    } else if (name === "santri-database") {
      dispatch(`santri/database/changeUnit`, state.unit, { root: true });
    } else if (name === "pegawai-database") {
      dispatch(`pegawai/database/changeUnit`, state.unit, { root: true });
    } else if (name === "santri-kelas") {
      dispatch(`santri/kelas/changeUnit`, state.unit, { root: true });
    } else if (name === 'settings-kelas') {
      dispatch('kelas/changeUnit', state.unit, { root: true })
    } else if (name === 'settings-absensi') {
      dispatch('setupabsensi/getAbsensi', state.unit, { root: true })
    } else if (name === 'settings-struktur') {
      dispatch('struktur/changeUnit', state.unit, { root: true })
    } else if (name === 'pengampu') {
      dispatch('pengampu/changeUnit', null, { root: true })
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
      dispatch('report/nilaimapel/changeUnit', null, { root: true })
    } else if (name === 'report-tahfidz-absensi') {
      dispatch('report/tahfidz/absensi/changeUnit', null, { root: true })
    } else if (name === 'report-tahfidz-hafalan') {
      dispatch('report/tahfidz/hafalan/changeUnit', null, { root: true })
    } else if (name === 'report-tahfidz-nilai') {
      dispatch('report/tahfidz/nilai/changeUnit', null, { root: true })
    } else if (name === 'report-pengampu') {
      dispatch('report/pengampu/changeUnit', null, { root: true })
    } else if (name === 'report-absensi') {
      dispatch('report/absensi/changeUnit', null, { root: true })
    } else if (name === 'report-jurnal') {
      dispatch('report/jurnal/changeUnit', null, { root: true })
    } else if (name === 'settings-pelanggaran') {
      dispatch('report/jurnal/changeUnit', null, { root: true })
    }
  },
}
