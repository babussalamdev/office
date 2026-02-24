import Swal from "sweetalert2";
export default {
  async changeUnit({ dispatch, state, commit }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    // Read the current selected type from state
    const apiType = state.selectedType;

    try {
      // Inject apiType dynamically into the endpoint
      const result = await this.$apiBase.$get(`get-settings?type=${apiType}&sk=${program}`);

      if (result) {
        commit("setState", { key: "list", value: result });
      } else {
        // Optional: clear the list if no data is returned for the selected type
        commit("setState", { key: "list", value: [] });
      }
      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async updateList({ commit, state, dispatch }, sk) {
    const i = state.list.findIndex((x) => x.SK === sk);
    const pk = state.list[i].PK.replace("#", "%23");
    const status = state.list[i].Status === "active" ? "inactive" : "active";
    const data = {
      Status: status,
    };
    const result = await Swal.fire({
      title: sk,
      text: `Data akan di${status}kan!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status} it!`,
    });

    if (result.isConfirmed) {
      await this.$apiBase.$put(`update-settings?type=${pk}&sk=${sk}`, data);
      commit("updateList", { sk, status });
      Swal.fire({
        position: "center",
        icon: "success",
        text: `Data berhasil di${status}!`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
};
