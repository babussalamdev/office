import Swal from "sweetalert2";

export default {
  // ... existing changeUnit ...
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    try {
      const resPeriode = await this.$apiBase.$get(`get-settings?sk=${program}&type=periode`);
      const label = rootState.index.label;
      const semester = rootState.index.semester;
      commit("setPeriode", { label, semester, resPeriode });

      const kelas = this.$auth.user.Kelas[program];

      // If user has no fixed class (admin/teacher) OR checking logic
      if (kelas === "off") {
        const listKelas = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=kelas`);
        commit("setState", { key: "kelas", value: listKelas });
        dispatch("index/submitLoad", null, { root: true });
        return;
      }

      // Default active load
      const result = await this.$apiBase.$get(`get-settings?sk=${program}%23${kelas}%23${semester}&type=mapel`);
      commit("setMapel", result);
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
  async changeGetMapelSemester({ commit, state, dispatch }) {
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
        const result = await this.$apiBase.$get(`get-settings?sk=${tahun}%23${semester}%23&type=report-kelas&program=${program}`);

        // Update state 'kelas' so the dropdown appears
        commit("setState", { key: "kelas", value: result });
      } else {
        // --- LOGIC FOR ACTIVE ---
        // If active, usually relies on logged-in user's class or previously loaded options
        const userKelas = this.$auth.user.Kelas[program];

        if (state.kelas.length === 0 && userKelas !== "off") {
          // If user has a specific class, auto-select mapels for it
          const result = await this.$apiBase.$get(`get-settings?sk=${program}%23${userKelas}&type=mapel`);
          commit("setMapelSemester", result);
        } else if (userKelas === "off") {
          // If admin, ensure class list is populated (usually done in changeUnit, but good to ensure)
          const listKelas = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=kelas`);
          commit("setState", { key: "kelas", value: listKelas });
        }
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

  // --- UPDATED: Fetch Mapel when Class is Selected ---
  async getMapel({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const kelas = state.selectedKelas; // Taken from dropdown
    const semester = rootState.index.semester; // Or state.selectedSemester.Semester depending on structure
    const status = state.selectedSemester.Status;

    try {
      if (status === "inactive") {
        // --- LOGIC CHANGE FOR INACTIVE MAPEL FETCH ---
        // Ensure we have a class selected
        if (!kelas) {
          dispatch("index/submitLoad", null, { root: true });
          return;
        }

        const datas = {
          Filter: "mapel",
          Kelas: kelas,
          Tahun: state.selectedLabel,
          Semester: state.selectedSemester.Semester,
        };

        // Fetch Mapel using get-nilai-sisalam
        const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);
        commit("setMapel", result);
      } else {
        // --- ACTIVE LOGIC ---
        // Uses get-settings
        const result = await this.$apiBase.$get(`get-settings?sk=${program}%23${kelas}%23${semester}&type=mapel`);
        commit("setMapel", result);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memuat Mapel",
        text: error.message,
      });
    }

    dispatch("index/submitLoad", null, { root: true });
  },

  // ... existing getSantri (Logic generally looks okay provided selectedMapel/Kelas is set) ...
  async getSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const datas = {};
    const status = state.selectedSemester.Status;

    // Safety check
    if (!state.selectedMapel) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    datas["Subject"] = state.selectedMapel.Nama;
    datas["Tahun"] = state.selectedLabel;
    datas["Semester"] = state.selectedSemester.Semester;
    datas["Periode"] = status;

    try {
      if (status === "active") {
        datas["Filter"] = `report-${state.selectedMapel.Jurusan}`;
        datas["Kelas"] = state.selectedMapel.Kelas;
        datas["Penilaian"] = state.selectedMapel.Penilaian;
      } else {
        // Inactive: Use non-jurusan report filter usually
        datas["Filter"] = `report-non-jurusan`;
        // Ensure we use the selectedKelas from the dropdown
        datas["Kelas"] = state.selectedKelas ? state.selectedKelas : this.$auth.user.Kelas[program];
        datas["Penilaian"] = state.selectedMapel.Penilaian;
      }

      const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);

      if (result) {
        const obj = { key: "santri", value: result.data, status };
        commit("setState", obj);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    dispatch("index/submitLoad", null, { root: true });
  },
};
