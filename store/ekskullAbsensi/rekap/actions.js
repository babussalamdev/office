import Swal from "sweetalert2";

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

    if (!thn) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    // Set fallback dates if they are currently empty
    if (!state.start) commit("setState", { key: "start", value: date });
    if (!state.end) commit("setState", { key: "end", value: date });

    try {
      const result = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=ekskull`);

      if (result) {
        commit("setEkskullOptions", result);
        // NOTE: We intentionally removed any logic here that would auto-assign
        // state.selectedEkskull = result[0], keeping it unselected by default.
      } else {
        commit("setEkskullOptions", []);
      }
    } catch (error) {
      console.error(error);
      commit("setEkskullOptions", []);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getDataSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const ekskull = state.selectedEkskull;

    let start = state.start;
    let end = state.end;

    if (!start || !end) {
      start = start || date;
      end = end || date;
      commit("setState", { key: "start", value: start });
      commit("setState", { key: "end", value: end });
    }

    if (!ekskull || !tahun || !start || !end) {
      commit("setState", { key: "santri", value: [] });
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    try {
      const result = await this.$apiSantri.$get(
        `get-recapabsensi-sisalam?method=ekskull&value=${ekskull}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}`,
      );

      if (result) {
        commit("setState", { key: "santri", value: result });
      }
    } catch (error) {
      console.error("Failed to fetch Recap Ekskull:", error);
      commit("setState", { key: "santri", value: [] });
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getDataSantriByDate({ dispatch }) {
    await dispatch("getDataSantri");
  },
};
