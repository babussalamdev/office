import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const today = new Date().toISOString().split("T")[0];
    commit("setState", { key: "start", value: today });
    commit("setState", { key: "end", value: today });
    try {
      const result = await this.$apiSantri.$get(`get-santri-laundry?type=report&program=${program}&startDate=${state.start}&endDate=${state.end}`);
      if (result) {
        commit("setPage", result);
        dispatch("index/submitLoad", null, { root: true });
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getDataByDate({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      const result = await this.$apiSantri.$get(`get-santri-laundry?type=report&program=${program}&startDate=${state.start}&endDate=${state.end}`);
      if (result) {
        commit("setPage", result);
        dispatch("index/submitLoad", null, { root: true });
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
};
