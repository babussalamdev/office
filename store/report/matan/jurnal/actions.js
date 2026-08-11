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

      const listKelas = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=kelas`);
      commit("setState", { key: "kelas", value: listKelas });
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

  async changeGetMatanSemester({ commit, state, dispatch }) {
    const program = localStorage.getItem("program");
    const status = state.selectedSemester.Status;

    commit("resetForNewSemester");
    dispatch("index/submitLoad", null, { root: true });

    try {
      if (status === "inactive") {
        const tahun = state.selectedLabel;
        const semester = state.selectedSemester.Semester;

        const result = await this.$apiBase.$get(`get-settings?sk=${tahun}%23${semester}%23&type=report-kelas&program=${program}`);
        commit("setState", { key: "kelas", value: result });
      } else {
        const listKelas = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=kelas`);
        commit("setState", { key: "kelas", value: listKelas });
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

  async getMatan({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const kelas = state.selectedKelas;
    const tahun = state.selectedLabel; // Automatically switches based on the selected year

    try {
      // Ensure we have the required parameters before making the call
      if (!kelas || !tahun) {
        dispatch("index/submitLoad", null, { root: true });
        return;
      }

      // Simplified API call for both active and inactive periods
      const result = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${kelas}`);

      commit("setMatan", result);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal memuat Matan",
        text: error.message,
      });
    }

    dispatch("index/submitLoad", null, { root: true });
  },

  async getData({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    try {
      if (state.selectedMatan && state.selectedKelas) {
        const subject = state.selectedMatan; // Now retrieves the SK dynamically
        const kelas = state.selectedKelas;
        const tahun = state.selectedLabel;
        const semester = state.selectedSemester.Semester;

        const result = await this.$apiBase.$get(`get-journal?type=journal&subject=${subject}&thn=${tahun}&smstr=${semester}&kls=${kelas}`);

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
    }

    dispatch("index/submitLoad", null, { root: true });
  },
};
