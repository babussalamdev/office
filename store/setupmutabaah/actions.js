import Swal from "sweetalert2";
export default {
  async changeUnit({ dispatch, state, commit }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      // Inject apiType dynamically into the endpoint
      const result = await this.$apiBase.$get(`get-settings?type=mutabaah&sk=${program}%23`);
      commit("setState", { key: "list", value: result });
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
  async updatePencatatan({ commit, state }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    const sk = state.updateDataPencatatan.SK.replace(/#/g, "%23");
    const i = state.list.findIndex((x) => x.SK === state.updateDataPencatatan.SK);

    const array = state.list[i];
    const pencatatan = {
      ...array?.Pencatatan,
      [data.category]: data.name,
    };
    data["Pencatatan"] = pencatatan;
    delete data.name;
    delete data.category;
    try {
      const result = await this.$apiBase.$put(`update-settings?type=mutabaah&sk=${sk}`, data);
      commit("updatePencatatan", { pencatatan, i });
      commit("updatePencatatanModal");
      commit("btn");
    } catch (error) {
      commit("btn");
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
};
