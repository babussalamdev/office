import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    // get periode
    try {
      const resPeriode = await this.$apiBase.$get(`get-settings?sk=${program}&type=periode`);
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;
      commit("setPeriode", { tahun, semester, resPeriode });

      const kelas = this.$auth.user.Kelas[program];

      // If Admin/No fixed class
      if (kelas === "off") {
        // Load active classes by default
        const listKelas = await this.$apiBase.$get(`get-settings?type=kelas&sk=${program}`);
        commit("setState", { key: "kelas", value: listKelas.kelas });
        dispatch("index/submitLoad", null, { root: true });
        return;
      }

      // If User has fixed class (Walas/Student), load their data immediately
      const reqPenilaian = this.$apiBase.$get(`get-settings?program=${program}&type=penilaian`);
      const reqLeger = this.$apiSantri.$get(`get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=all`);

      const [resPenilaian, resLeger] = await Promise.all([reqPenilaian, reqLeger]);

      if (resLeger) {
        commit("setState", { key: "mapelSelect", value: resPenilaian.mapel });
        commit("setState", { key: "quranSelect", value: resPenilaian.quran });
        commit("setState", { key: "selectedMapel", value: "" });
        commit("setState", { key: "santri", value: resLeger });
      }
      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      console.error(error);
    }
  },

  async changeUnitSemester({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = state.selectedLabel;
    const semester = state.selectedSemester.Semester;
    const status = state.selectedSemester.Status;

    // 1. Reset Data
    commit("resetForNewSemester");

    const userKelas = this.$auth.user.Kelas[program];

    try {
      // --- LOGIC FOR INACTIVE (Historical) ---
      if (status === "inactive") {
        if (userKelas === "off") {
          // Fetch Historical Classes
          const result = await this.$apiBase.$get(`get-settings?sk=${tahun}%23${semester}%23&type=report-kelas&program=${program}`);
          const kelas = result.map((item) => ({
            Nama: item,
          }));
          // Result is usually an array of class names for report-kelas
          commit("setState", { key: "kelas", value: kelas });
        } else {
          // If user is Walas/Student, they can only see their own class history
          // Trigger data fetch immediately for their specific class
          const reqLeger = await this.$apiSantri.$get(
            `get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${userKelas}&methode=all`,
          );
          commit("setState", { key: "santri", value: reqLeger });
        }
      }
      // --- LOGIC FOR ACTIVE ---
      else {
        if (userKelas === "off") {
          // Fetch Active Classes
          const listKelas = await this.$apiBase.$get(`get-settings?type=kelas&sk=${program}`);
          commit("setState", { key: "kelas", value: listKelas.kelas });
        } else {
          // Fetch Active Data for specific user
          // We reuse the logic from changeUnit or simply fetch leger here
          const reqPenilaian = this.$apiBase.$get(`get-settings?program=${program}&type=penilaian`);
          const reqLeger = this.$apiSantri.$get(
            `get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${userKelas}&methode=all`,
          );
          const [resPenilaian, resLeger] = await Promise.all([reqPenilaian, reqLeger]);

          commit("setState", { key: "mapelSelect", value: resPenilaian.mapel });
          commit("setState", { key: "quranSelect", value: resPenilaian.quran });
          commit("setState", { key: "santri", value: resLeger });
        }
      }

      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memuat semester",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async changeUnitClass({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = state.selectedLabel;
    const semester = state.selectedSemester.Semester;
    const kelas = state.selectedKelas;
    const status = state.selectedSemester.Status;

    if (!kelas) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    try {
      // Logic split: Inactive doesn't need penilaian options (mapel dropdowns are hidden)
      if (status === "inactive") {
        const reqLeger = await this.$apiSantri.$get(
          `get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=all&status=${status}`,
        );

        if (reqLeger) {
          commit("setState", { key: "santri", value: reqLeger });
        }
      } else {
        // Active: Needs Penilaian for the dropdowns
        const reqPenilaian = this.$apiBase.$get(`get-settings?program=${program}&type=penilaian`);
        const reqLeger = this.$apiSantri.$get(
          `get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=all&status=${status}`,
        );

        const [resPenilaian, resLeger] = await Promise.all([reqPenilaian, reqLeger]);

        if (resLeger) {
          commit("setState", { key: "mapelSelect", value: resPenilaian.mapel });
          commit("setState", { key: "quranSelect", value: resPenilaian.quran });
          commit("setState", { key: "selectedMapel", value: "" });
          commit("setState", { key: "santri", value: resLeger });
        }
      }

      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data kelas",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  // This is only used when "Active" and user filters by specific Mapel
  async getSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = state.selectedLabel;
    const semester = state.selectedSemester.Semester;
    const kelas = this.$auth.user.Kelas[program] === "off" ? state.selectedKelas : this.$auth.user.Kelas[program];

    // Safety check
    if (!state.selectedMapel || !state.selectedQuran) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const type1 = state.selectedMapel.includes("+") ? encodeURIComponent(state.selectedMapel) : state.selectedMapel;
    const type2 = state.selectedQuran;

    try {
      const result = await this.$apiSantri.$get(
        `get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=separate&type1=${type1}&type2=${type2}`,
      );
      commit("setState", { key: "santri", value: result });
    } catch (err) {
      console.log(err);
    }
    dispatch("index/submitLoad", null, { root: true });
  },
};
