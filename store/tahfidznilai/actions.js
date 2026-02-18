import Swal from "sweetalert2";

export default {
  // Initialize Page and fetch Periods
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      // 1. Fetch Periode Settings
      const resPeriode = await this.$apiBase.$get(`get-settings?sk=${program}&type=periode`);
      const label = rootState.index.label;
      const semester = rootState.index.semester;

      // 2. Commit Periode to setup Dropdowns
      commit("setPeriode", { label, semester, resPeriode });

      // 3. Initial Load (Optional: could load active data immediately if needed)
      // For now, we wait for user interaction or default to active logic below
      const halaqah = this.$auth.user.Halaqah[program];

      if (halaqah !== "off") {
        // If user is a teacher with a fixed Halaqah, you might want to auto-load active data here
        // But based on your component, it seems driven by dropdowns.
      }

      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      console.error(error);
    }
  },

  // Triggered when Semester Dropdown changes
  async changeUnitBySemester({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    commit("resetForNewSemester"); // Clear previous data

    const program = localStorage.getItem("program");
    const status = state.selectedSemester.Status;
    const tahun = state.selectedLabel;
    const semester = state.selectedSemester.Semester;

    try {
      if (status === "inactive") {
        // --- INACTIVE LOGIC ---
        // Fetch historical Halaqah/Group list for that specific year/semester
        // Assuming 'report-halaqah' type exists, otherwise use 'report-kelas' if structure is same
        const result = await this.$apiBase.$get(`get-settings?sk=${tahun}%23${semester}%23&type=report-halaqah&program=${program}`);

        // Map result to listKelas for the dropdown
        commit("setState", { key: "listKelas", value: result });
      } else {
        // --- ACTIVE LOGIC ---
        const userHalaqah = this.$auth.user.Halaqah[program];

        if (userHalaqah === "off") {
          // Admin: Fetch all active Halaqahs
          const result = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=halaqah`);
          commit("setState", { key: "listKelas", value: result });
        } else {
          // Teacher: Lock to their Halaqah (Single Option)
          // We mimic the object structure { SK: '...', Nama: '...' }
          const singleOption = [{ SK: `${program}#${userHalaqah}`, Nama: userHalaqah }];
          commit("setState", { key: "listKelas", value: singleOption });

          // Optional: Auto-select if there's only one
          commit("setState", { key: "selectedKelas", value: singleOption[0] });
          // Auto-fetch data if desired:
          dispatch("getSantri");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Gagal memuat data halaqah" });
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  // Triggered when Class/Halaqah is selected
  async getSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    // Ensure we have a selected "Kelas" (Halaqah)
    if (!state.selectedKelas) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    // Parse the SK to get the clean Halaqah name if needed (e.g. "Tahfidz#Halaqah A" -> "Halaqah A")
    // Depending on your API, you might send the full SK or just the name.
    // Based on your component: {{ data.SK.split('#')[1] }}, let's extract it.
    const rawHalaqah = state.selectedKelas.SK ? state.selectedKelas.SK.split("#")[1] : state.selectedKelas;

    const datas = {};
    datas["Filter"] = "penilaian-quran";
    datas["Halaqah"] = rawHalaqah;
    datas["Subject"] = "quran";
    datas["Tahun"] = state.selectedLabel;
    datas["Semester"] = state.selectedSemester.Semester;

    try {
      // 1. Get Settings (Quran columns/headers) for that specific context
      // Note: Using the historical params
      const settingData = await this.$apiBase.$get(`get-settings?program=${program}&type=nilaiquran&hlq=${rawHalaqah}&smstr=${datas["Semester"]}`);

      if (!settingData.quran) {
        Swal.fire({ icon: "warning", text: "Setting penilaian belum ada." });
        dispatch("index/submitLoad", null, { root: true });
        return;
      }

      commit("setState", { key: "selectedQuran", value: settingData.quran });
      datas["Penilaian"] = settingData.quran.Penilaian;

      // 2. Fetch Student Scores
      const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}&type=pengampu`, datas);

      if (result && result.data) {
        commit("setState", { key: "santri", value: result.data });

        // 3. Setup Table Headers
        const newData = settingData.quran.Penilaian || {};
        const newHeaders = { Nama: "", Halaqah: "" }; // Added Halaqah to header
        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }
        if (state.th.hasOwnProperty("Total")) {
          newHeaders["Total"] = state.th["Total"];
        }
        commit("setState", { key: "th", value: newHeaders });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", text: "Gagal mengambil data nilai." });
    }

    dispatch("index/submitLoad", null, { root: true });
  },
};
