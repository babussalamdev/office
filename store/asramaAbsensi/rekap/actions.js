import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    try {
      const resPeriode = await this.$apiBase.$get(`get-settings?sk=${program}&type=periode`);
      const label = rootState.index.label;
      const semester = rootState.index.semester;
      commit("setPeriode", { label, semester, resPeriode });
      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  // --- UPDATED: Fetch Classes when Semester Changes (especially for Inactive) ---
  async changeGetAsramaSemester({ commit, state, dispatch }) {
    commit("setState", { key: "values", value: [] }); // Immediate clear
    const program = localStorage.getItem("program");
    const status = state.selectedSemester.Status;

    // 1. Reset downstream data (Mapel, Selected Class, Santri)
    commit("resetForNewSemester");

    dispatch("index/submitLoad", null, { root: true });

    try {
      if (status === "inactive") {
        // --- LOGIC CHANGE FOR INACTIVE ---
        const tahun = state.selectedLabel;
        const semester = state.selectedSemester.Semester;

        // Fetch Classes available in that specific past Year/Semester
        // Note: Using %23 for '#' as requested
        const result = await this.$apiBase.$get(`get-settings?tahun=${tahun}&semester=${semester}&type=report-asrama&program=${program}`);

        // Update state 'kelas' so the dropdown appears
        commit("setState", { key: "asrama", value: result });
      } else {
        // --- LOGIC FOR ACTIVE ---
        // If active, usually relies on logged-in user's class or previously loaded options
        // const userKelas = this.$auth.user.Kelas[program];

        const listAsrama = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=asrama`);
        commit("setState", { key: "asrama", value: listAsrama });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data kelas/semester",
        text: error.message,
      });
    }

    dispatch("index/submitLoad", null, { root: true });
  },

  async getData({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    try {
      if (state.selectedAsrama && state.selectedLabel && state.selectedSemester) {
        const program = localStorage.getItem("program");
        const asrama = state.selectedAsrama;
        const tahun = state.selectedLabel;
        const semester = state.selectedSemester.Semester;
        const result = await this.$apiSantri.$get(
          `get-recapabsensi-sisalam?method=asrama&program=${program}&thn=${tahun}&smstr=${semester}&value=${asrama}`,
        );
        if (result) {
          commit("setState", { key: "values", value: result });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data",
        text: error.message,
      });
    } // Placed outside the if/try blocks so it always stops the loading state

    dispatch("index/submitLoad", null, { root: true });
  },
};
