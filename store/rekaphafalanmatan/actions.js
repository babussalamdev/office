import Swal from "sweetalert2";

export default {
  // ADDED: Fetch the list of available Matan (like the mutabaahmatan module)
  async getMatanList({ commit, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const kelas = this.$auth.user.Kelas[program];

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    try {
      const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${kelas}`);
      console.log(resSelect);
      if (resSelect && resSelect.length > 0) {
        commit("setMatanList", resSelect);
        // The watcher in index.vue will automatically trigger changeUnit when selectedMatan is set
      } else {
        commit("setMatanList", []);
        commit("setState", { key: "santri", value: [] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async changeUnit({ commit, state, dispatch, rootState }) {
    // Block fetch if no Matan is selected
    if (!state.selectedMatan) {
      commit("setState", { key: "santri", value: [] });
      return;
    }

    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const value = this.$auth.user.Kelas[program];
    const tahun = rootState.index.label;

    // Grab the SK Matan from the dropdown state
    const skmatan = state.selectedMatan;

    // Construct the searchterm and properly encode the '#' characters for the URL
    const rawSearchterm = `ziyadahmatan#${skmatan}`;
    const searchterm = rawSearchterm.replace(/#/g, "%23");

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    try {
      const result = await this.$apiSantri.$get(
        `get-tahfidz-sisalam?type=matan&kls=${value}&program=${program}&thn=${tahun}&startdate=${state.start}&enddate=${state.end}&searchterm=${searchterm}`,
      );

      if (result) {
        commit("setState", { key: "santri", value: result });
      } else {
        commit("setState", { key: "santri", value: [] });
      }
    } catch (error) {
      console.error(error);
      commit("setState", { key: "santri", value: [] });
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
};
