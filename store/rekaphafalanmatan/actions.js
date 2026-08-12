import Swal from "sweetalert2";

// Setup today's date for fallback
const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default {
  async getMatanList({ commit, state, dispatch, rootState }, isManualChange = true) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    try {
      // 1. Fetch Class list dynamically if it's empty
      if (!state.kelas || state.kelas.length === 0) {
        const resKelas = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
        const kelasArray = resKelas.kelas || [];

        commit("setState", { key: "kelas", value: kelasArray });

        // Auto-select the first class if none is selected
        if (kelasArray.length > 0 && !state.selectedKelas) {
          commit("setState", { key: "selectedKelas", value: kelasArray[0].Nama });
        }
      }

      const activeKelas = state.selectedKelas;

      if (!activeKelas) {
        commit("setMatanList", []);
        commit("setState", { key: "santri", value: [] });
        return;
      }

      // 2. Fetch Matan based on the active class
      const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${activeKelas}`);

      if (resSelect && resSelect.length > 0) {
        commit("setMatanList", resSelect);
      } else {
        if (!isManualChange) {
          Swal.fire({
            position: "center",
            icon: "warning",
            text: "Anda tidak mengajar matan apapun di kelas ini",
          });
        }
        commit("setMatanList", []);
        commit("setState", { key: "santri", value: [] });
      }
    } catch (error) {
      console.error("Error fetching matan units:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    // Retrieve dates and ensure they are populated
    let start = state.start;
    let end = state.end;

    if (!start || !end) {
      start = start || date;
      end = end || date;
      commit("setState", { key: "start", value: start });
      commit("setState", { key: "end", value: end });
    }

    // STRICT GUARD: Block fetch if parameters are missing
    if (!state.selectedMatan || !state.selectedKelas || !start || !end) {
      commit("setState", { key: "santri", value: [] });
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const program = localStorage.getItem("program");
    const activeKelas = state.selectedKelas;
    const tahun = rootState.index.label;

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    // Grab the SK Matan and construct the searchterm safely
    const skmatan = state.selectedMatan;
    const rawSearchterm = `ziyadahmatan#${skmatan}`;
    const searchterm = rawSearchterm.replace(/#/g, "%23");

    try {
      const result = await this.$apiSantri.$get(
        `get-tahfidz-sisalam?type=matan&kls=${activeKelas}&program=${program}&thn=${tahun}&startdate=${start}&enddate=${end}&searchterm=${searchterm}`,
      );

      if (result) {
        commit("setState", { key: "santri", value: result });
      } else {
        commit("setState", { key: "santri", value: [] });
      }
    } catch (error) {
      console.error("Error fetching tahfidz data:", error);
      commit("setState", { key: "santri", value: [] });
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
};
