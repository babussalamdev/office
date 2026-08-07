// date
const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const thn = rootState.index.label;
    let authKelas = this.$auth.user.Kelas[program];

    if (!thn) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    // 1. Check if Kelas is 'off' to fetch the class list dynamically
    if (authKelas === "off") {
      if (state.kelas.length === 0) {
        const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
        commit("setState", { key: "kelas", value: result.kelas });

        // Auto-select the first class if available
        if (result.kelas && result.kelas.length > 0) {
          commit("setState", { key: "selectedKelas", value: result.kelas[0].Nama });
        }
      }
      // Assign authKelas to whatever is currently selected in the dropdown
      authKelas = state.selectedKelas;
    } else {
      // Keep it locked to the user's assigned class if not 'off'
      commit("setState", { key: "selectedKelas", value: authKelas });
    }

    // 2. Block matan fetch if no active class is found
    if (!authKelas) {
      commit("setSelect", []);
      commit("setState", { key: "santri", value: [] });
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    commit("setState", { key: "start", value: date });
    commit("setState", { key: "end", value: date });

    // 3. Fetch Matan based on the active class
    const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${thn}&kelas=${authKelas}`);

    if (resSelect && resSelect.length > 0) {
      commit("setSelect", resSelect);
    } else {
      // Removed the SweetAlert warning here
      commit("setSelect", []);
      commit("setState", { key: "santri", value: [] });
    }

    dispatch("index/submitLoad", null, { root: true });
  },

  async getDataSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;

    // CHANGED: Use selectedKelas from state instead of auth user
    const kelas = state.selectedKelas;

    const start = state.start;
    const end = state.end;
    const matan = state.selectedMatan.Nama;

    if (!tahun && !semester) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    commit("setState", { key: "start", value: date });
    commit("setState", { key: "end", value: date });

    const result = await this.$apiSantri.$get(
      `get-recapabsensi-sisalam?method=matan&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}&matan=${matan}`,
    );

    if (result) {
      commit("setState", { key: "santri", value: result });
    } else {
      commit("setState", { key: "santri", value: [] });
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  async getDataSantriByDate({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;

    // CHANGED: Use selectedKelas from state instead of auth user
    const kelas = state.selectedKelas;

    const start = state.start;
    const end = state.end;
    const matan = state.selectedMatan.Nama;

    if (!tahun && !semester) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const result = await this.$apiSantri.$get(
      `get-recapabsensi-sisalam?method=matan&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}&matan=${matan}`,
    );

    if (result) {
      commit("setState", { key: "santri", value: result });
    } else {
      commit("setState", { key: "santri", value: [] });
    }
    dispatch("index/submitLoad", null, { root: true });
  },
};
