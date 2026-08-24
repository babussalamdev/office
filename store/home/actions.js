export default {
  async setMainChart({ commit, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    if (data === "root") {
      const result = await this.$apiBase.$get(`get-dashboard?program=${data}`);
      commit("setChartAdmin", result);
      dispatch("index/submitLoad", null, { root: true });
    } else if (data === "sarpras") {
      const jabatan = this.$auth.user.Jabatan?.sarpras;
      const result = await this.$apiOB.$get(`get-dashboard?jabatan=${jabatan}`);
      commit("setChartSarpras", result);
      dispatch("index/submitLoad", null, { root: true });
    } else {
      const result = await this.$apiSantri.$get(`get-dashboard-sisalam?program=${data}`);
      commit("setChart", result);
      dispatch("index/submitLoad", null, { root: true });
      // const program = localStorage.getItem('program')
      // const result = await this.$apiBase.$get(
      //   `get-dashboard?program=${program}`
      // );
      // commit('setChart', result);
    }
  },
  async updateLaporanStatus({ commit }, status) {
    // Determine SK from local storage (sma / smp)
    const program = localStorage.getItem("program");

    // Prepare the payload (will be parsed by backend event.body)
    const payload = {
      Status: status, // "on" or "off"
    };

    try {
      // type corresponds to PK, sk corresponds to SK in your DynamoDB Lambda logic
      const result = await this.$apiBase.$put(`update-settings?type=laporan&sk=${program}`, payload);

      if (result) {
        // Update local state if the database update is successful
        commit("setReportStatus", status);
      }
    } catch (error) {
      console.error("Error updating Laporan status:", error);
      // Optional: Add notification logic here if it fails
    }
  },
};
