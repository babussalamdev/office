export default {
    setUnit({ commit, state, dispatch }, datas) {
        localStorage.setItem("program", state.unit);
        if (state.unit === "root") {
            commit("index/root", null, { root: true });
        } else {
            dispatch("index/changeUnit", state.unit, { root: true });
        }
        const name = datas.route
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
        } else if (name === "settings-struktur") {
            dispatch(`struktur/changeUnit`, state.unit, { root: true });
        } else if (name === "setting-setupabsensi") {
            dispatch(`setupabsensi/getAbsensi`, state.unit, { root: true });
        } else if (name === "santri-database") {
            dispatch(`santri/database/changeUnit`, state.unit, { root: true });
        } else if (name === "pegawai-database") {
            dispatch(`pegawai/database/changeUnit`, state.unit, { root: true });
        } else if (name === "santri-kelas") {
            dispatch(`santri/kelas/changeUnit`, state.unit, { root: true });
        }
    },
}
