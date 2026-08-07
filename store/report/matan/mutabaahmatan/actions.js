export default {
  async getMatanList({ commit, dispatch, rootState, state }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    let authKelas = this.$auth.user.Kelas[program];

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    try {
      // 1. Check if Kelas is 'off' to fetch the class list
      if (authKelas === "off") {
        // Fetch classes only if we haven't loaded them yet
        if (state.kelas.length === 0) {
          const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
          commit("setState", { key: "kelas", value: result.kelas });

          // Auto-select the first class if available
          if (result.kelas && result.kelas.length > 0) {
            commit("setState", { key: "selectedKelas", value: result.kelas[0].Nama });
          }
        }
        // Use the dropdown's selected class
        authKelas = state.selectedKelas;
      } else {
        // If not 'off', ensure selectedKelas matches the user's assigned class
        commit("setState", { key: "selectedKelas", value: authKelas });
      }

      // 2. Block matan fetch if no active class is found
      if (!authKelas) {
        commit("setMatanList", []);
        commit("setState", { key: "santri", value: [] });
        return;
      }

      // 3. Fetch Matan based on the active class
      const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${authKelas}`);

      if (resSelect && resSelect.length > 0) {
        commit("setMatanList", resSelect);
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
    // Block fetch if no Matan OR no Kelas is selected
    if (!state.selectedMatan || !state.selectedKelas) {
      commit("setState", { key: "santri", value: [] });
      return;
    }

    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;

    // CHANGED: Use selectedKelas from state instead of auth user
    const value = state.selectedKelas;
    const skmatan = state.selectedMatan;

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
