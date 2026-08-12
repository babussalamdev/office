import Swal from "sweetalert2";

// Setup today's date for fallback
const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default {
  async changeUnit({ commit, state, dispatch, rootState }, isManualChange = true) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const thn = rootState.index.label;

    if (!thn) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    // Fetch Class list dynamically
    if (!state.kelas || state.kelas.length === 0) {
      const resKelas = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
      const kelasArray = resKelas.kelas || [];

      commit("setState", { key: "kelas", value: kelasArray });

      if (kelasArray.length > 0 && !state.selectedKelas) {
        commit("setState", { key: "selectedKelas", value: kelasArray[0].Nama });
      }
    }

    const activeKelas = state.selectedKelas;

    if (!activeKelas) {
      commit("setSelect", []);
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    // Set fallback dates if they are currently empty
    if (!state.start) commit("setState", { key: "start", value: date });
    if (!state.end) commit("setState", { key: "end", value: date });

    const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${thn}&kelas=${activeKelas}`);

    if (resSelect && resSelect.length > 0) {
      commit("setSelect", resSelect);
    } else {
      if (!isManualChange) {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: "Anda tidak mengajar matan apapun di kelas ini",
        });
      }
      commit("setSelect", []);
    }

    dispatch("index/submitLoad", null, { root: true });
  },

  async getDataSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const kelas = state.selectedKelas;

    // Retrieve dates
    let start = state.start;
    let end = state.end;

    // Safety fallback: If dates are completely missing, use today's date
    if (!start || !end) {
      start = start || date;
      end = end || date;
      commit("setState", { key: "start", value: start });
      commit("setState", { key: "end", value: end });
    }

    // GUARD: Strictly block the API call if ANY required parameter is missing
    if (!state.selectedMatan || !kelas || !tahun || !start || !end) {
      commit("setState", { key: "santri", value: [] });
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const matan = state.selectedMatan.Nama;

    try {
      const result = await this.$apiSantri.$get(
        `get-recapabsensi-sisalam?method=matan&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}&matan=${matan}`,
      );

      if (result) {
        commit("setState", { key: "santri", value: result });
      }
    } catch (error) {
      console.error("Failed to fetch Recap Matan:", error);
      commit("setState", { key: "santri", value: [] }); // Clear table on error
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getDataSantriByDate({ dispatch }) {
    // Both actions perform the exact same safety checks, so we route them together.
    await dispatch("getDataSantri");
  },
};
